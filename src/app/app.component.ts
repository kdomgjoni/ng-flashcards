import { Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { IFlash } from './flash.model';
import { NgForm } from '@angular/forms';
import { FlashService } from './flash.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('flashForm', { static: false }) flashForm: NgForm;

  flash = {
    question: '',
    answer: ''
  };

  editing = false;
  editingId: number;
  flashs;
  subscription: any;

  flash$: Observable<IFlash[]>

  constructor(private flashService: FlashService) {
    this.flashs = this.flashService.flashs;
  }

  trackByFlashId(index, flash) {
    return flash.id;
  }

  handleToggleCard(id: number) {
    this.flashService.toggleFlash(id);
  }

  handleDelete(id: number) {
    this.flashService.deleteFlash(id);
  }

  // handleEdit(id: number) {
  //   this.editing = true;
  //   this.editingId = id;
  //   // TODO: We will add editing logic after adding the form
  // }

  handleRememeberedChange({ id, flag }) {
    this.flashService.rememberedChange(id, flag);
  }

  handleSubmit(): void {
    this.flashService.addFlash(this.flash);
    this.handleClear();
  }


  handleClear() {
    this.flash = {
      question: '',
      answer: '',
    };
    this.flashForm.reset();
  }

  handleEdit(id: number): void {
    this.flash = this.flashService.getFlash(id);
    this.editing = true;
    this.editingId = id;
  }

  handleUpdate() {
    this.flashService.updateFlash(this.editingId, this.flash);
    this.handleCancel();
  }
  handleCancel() {
    this.editing = false;
    this.editingId = undefined;
    this.handleClear();
  }

  ngOnInit() {
    this.flash$ = this.flashService.flashs$

    this.subscription = this.flashService.flashs$.subscribe(flashs => {
      this.flashs = flashs;
    });


  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }



}
