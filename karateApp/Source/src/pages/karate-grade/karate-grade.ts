import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { KarateService } from '../../services/karate.service';
import { WheelSelector } from '@ionic-native/wheel-selector';

@IonicPage()
@Component({
  selector: 'page-karate-grade',
  templateUrl: 'karate-grade.html',
  providers: [KarateService]
})
export class KarateGradePage {

  sessioName: string;
  judgeName: string;
  gradeList = [];

  data = {
    tecnicLevel: "7.0",
    phisicLevel: "7.0"
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, private karateService: KarateService, 
            private alertController: AlertController, private selector: WheelSelector) {
    this.sessioName = navParams.get('sessionName');
    this.judgeName = navParams.get('judgeName');
    
    
  }

  ionViewDidLoad() {
    const dummyJson = {
      integers: [
        {
          description: '5'
        },
        {
          description: '6'
        },
        {
          description: '7'
        },
        {
          description: '8'
        },
        {
          description: '9'
        },
        {
          description: '10'
        }
      ],
      floats: [
        {
          description: '0'
        },
        {
          description: '2'
        },
        {
          description: '4'
        },
        {
          description: '6'
        },
        {
          description: '8'
        },
      ]
    }
    this.gradeList = this.karateService.getGradeList();
    const jsonData = {
      list : this.gradeList
    }
    this.selector.show({
      title: "How Many?",
      items: [
        dummyJson.integers,
        dummyJson.floats
      ],
    }).then(
      result => {
        console.log(result);
        this.data = result[0];
        this.presentAlertConfirm();
      },
      err => console.log('Error: ', err)
    );
  }

  select() {
    const jsonData = {
      list : this.gradeList
    }
    this.selector.show({
      title: "How Many?",
      items: [
        this.gradeList
      ],
    }).then(
      result => {
        console.log(result[0].description + ' at index: ' + result[0].index);
      },
      err => console.log('Error: ', err)
    );
  }

  sendGrade() {
    this.karateService.createGrade(this.data,this.sessioName, this.judgeName);
    this.navCtrl.setRoot('GradeSendedPage', {
      sessionName: this.sessioName,
      judgeName: this.judgeName
    });
    this.navCtrl.popToRoot();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      title: 'Verifica',
      message: 'Estas seguro de esta calificación? Nivel técnico: ' + this.data.tecnicLevel + ', Nivel físico: ' + this.data.phisicLevel,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Si',
          handler: () => {
            this.sendGrade();
          }
        }
      ]
    });

    await alert.present();
  }

  async alertExit() {
    const alert = await this.alertController.create({
      title: 'Salir',
      message: 'Estas seguro de esta salir',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Si',
          handler: () => {
            this.navCtrl.setRoot('KarateHomePage');
            this.navCtrl.popToRoot();
          }
        }
      ]
    });
    await alert.present();

}

}
