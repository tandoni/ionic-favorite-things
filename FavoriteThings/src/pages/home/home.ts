import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from "angularfire2/database";
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit, OnDestroy {

  favoriteColor: string;
  favoriteNumber: number;

  constructor(private db: AngularFireDatabase, public navCtrl: NavController) {

  }

  ngOnInit(): void {
    firebase.database().ref('/color').on('value', (snapshot: firebase.database.DataSnapshot) => {
      this.favoriteColor = snapshot.val();
    });
    firebase.database().ref('/number').on('value', (snapshot: firebase.database.DataSnapshot) => {
      this.favoriteNumber = snapshot.val();
    });
  }

  setColor(color: string) {
    console.log('SET THE COLOR TO ' + color);
    firebase.database().ref('/color').set(color);
  }

  updateNumber(val: number) {
    this.setNumber(this.favoriteNumber + val);
  }

  setNumber(val: number) {
    firebase.database().ref('/number').set(val);
  }

  ngOnDestroy() {
    firebase.database().ref('/color').off();
    firebase.database().ref('/number').off();
  }

}
