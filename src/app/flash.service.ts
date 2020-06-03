import { Injectable, ViewChild } from '@angular/core';
import { IFlash } from './flash.model';
import { NgForm } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlashService {


  getRandomNumber() {
    return Math.floor(Math.random() * 10000);
  }

  flashs: IFlash[] = [{
    question: 'Question 1',
    answer: 'Answer 1',
    show: false,
    id: this.getRandomNumber(),
  }, {
    question: 'Question 2',
    answer: 'Answer 2',
    show: false,
    id: this.getRandomNumber(),
  }, {
    question: 'Question 3',
    answer: 'Answer 3',
    show: false,
    id: this.getRandomNumber(),
  }];

  constructor() { }

  flashs$ = new BehaviorSubject<IFlash[]>(this.flashs);

  addFlash(flash: IFlash) {
    this.flashs = [
      ...this.flashs, {
        ...flash,
        show: false,
        id: this.getRandomNumber(),
      }
    ];
    this.flashs$.next(this.flashs);
  }


  getFlash(id: number) {
    const flash = this.flashs.find(flash => flash.id === id);
    return flash;
  }


  updateFlash(id, flash: IFlash) {
    const index = this.flashs.findIndex(flash => flash.id === id);
    this.flashs = [
      ...this.flashs.slice(0, index),
      {
        ...this.flashs[index],
        ...flash,
      },
      ...this.flashs.slice(index + 1),
    ];
    this.flashs$.next(this.flashs);
  }

  deleteFlash(id: number) {
    const index = this.flashs.findIndex(flash => flash.id === id);
    this.flashs = [
      ...this.flashs.slice(0, index),
      ...this.flashs.slice(index + 1),
    ];
    this.flashs$.next(this.flashs);
  }


  rememberedChange(id: number, flag: string) {
    const index = this.flashs.findIndex(flash => flash.id === id);

    this.flashs = [
      ...this.flashs.slice(0, index),
      {
        ...this.flashs[index],
        remembered: flag
      },
      ...this.flashs.slice(index + 1),
    ];
    this.flashs$.next(this.flashs);
  }


  toggleFlash(id: number) {
    const index = this.flashs.findIndex(flash => flash.id === id);
    this.flashs = [
      ...this.flashs.slice(0, index),
      {
        ...this.flashs[index],
        show: !this.flashs[index].show
      },
      ...this.flashs.slice(index + 1),
    ];
    this.flashs$.next(this.flashs);
  }


}
