import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.css']
})
export class ProdutoFormComponent implements OnInit {

  meuForm: FormGroup | any = null;
  id: number = 0;
  isEdicao: boolean = false;

  constructor(private produtoService: ProdutoService, private router: Router, private activateRouter: ActivatedRoute) { }

  ngOnInit() {
    this.formulario();
    this.params();
  }

  formulario(){
    this.meuForm = new FormGroup({
      name        : new FormControl(null, [Validators.required]),//precisa está preenchido para poder salvar
      description : new FormControl(null, [Validators.required]),//precisa está preenchido para poder salvar
      image       : new FormControl(null, [Validators.required]),//precisa está preenchido para poder salvar
      price       : new FormControl(null, [Validators.required]),//precisa está preenchido para poder salvar
      status      : new FormControl(null, [Validators.required])//precisa está preenchido para poder salvar
      //categories  : new FormControl(null, [Validators.required])
    });
  }

  //se for uma edição vai passar o id via param.id para this.id( this.id = param.id)
  params(){
    this.activateRouter.params.subscribe((param: any) =>{
      console.log(param);

      if(param.id){
        this.isEdicao = true;
        this.id = param.id;
        this.produtoService.getOne(this.id).subscribe((resp: any) =>{
          this.meuForm.patchValue(resp.data);
        });
      }else{
        this.isEdicao = false;
      }
    });
  }

  onsubmit(){
    if(this.isEdicao){
      this.produtoService.update(this.id, this.meuForm.value).subscribe((data) =>{
        console.log(data);
        this.router.navigate(['produto-list']);
      });
    }else{
    this.produtoService.save(this.meuForm.value).subscribe((data) =>{
      this.meuForm.reset();
      console.log(data);
      this.router.navigate(['produto-form']);
      });
    }
  }
}
