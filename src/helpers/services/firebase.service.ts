import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
@Injectable()
export class FirebaseService {
  private db: FirebaseFirestore.Firestore;
  private readonly messaging: admin.messaging.Messaging;
  constructor() {
    const serviceAccount =  {
      private_key : "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCqcwVdRRQH5Chs\nOLWC5TsbhecM6nc75NJ5wFvEEQXViFr1fe5MW0YQ6bZ6xwJVkOIBavoP1CiLxv++\nRbCAznKocoLTpE5S7Ukv+m6ro2bZlFLjglA6bnX5keOIhsBt1v6VecepJommBtPE\nazCbfQleBDZvu/zcJ6qxnW34Nw/wsTxmfcjAl8VTt/i2SiLubVXeVPripQnbtFm1\n/Iu/tu6oL6DIfq7cY8aaqXV9fHDaZ4xjQOHy9/WL6TC75v3ohPuKMYCKiYvcpzj3\nszy27Z8w+DC0X0PBiYYgGqiu090CZpQFa18mZKNcx6Rn1atPhbBHAjSpMBWAGQD2\n/2A5A1J7AgMBAAECggEAE3qQjt+hkeNLkU6Lw7kxn4wWYv36gVA9k2ddtVLisUvj\nZTGuhXBa2fzzeyV6CVBE27efeyaaOZsUx+hL6vRs2v43IDujLcvrNL3wXtIOI2hV\nbqWKSJsuBUbcU1Je9E6BCpD/tb9vNJeMJOLBC8vmwaVGmU9I7tnjomek1RxpyG4w\n/8HlOpAJdFKNtuUK+1qpbemNRFmVOonLhfYl/4EaooNW+jabnasw8wwe0z88MEP3\n7sxcyD0uUCMjVUpgn3MU1BpLY6qyIgQcBsco5/CzTaNFxvl8KirjPUh+RKZD6Bpy\n0MZT3+Dbx1cf1ihbK8uo82DoxJA8bsjuDBZ1Cb/lkQKBgQDWX7hfPNOIL5J4rfQc\nD8T3P6WQxxpIvAMOBi0uBCy/KQ+ALNUMxpQuxOC3tQHNCU1SKSKzBxiDI/pF3f0S\nc03BRPX+W2BgOy3WOyDovj/6KgcPVrBreZFa23k79Vmb1PXz7B8Ql9Jt2SiWxYHV\nRfZ5Oi14dxH2TPe4hyJD8IzqcQKBgQDLi9v0g5HJbPO/hqBxiSGm4FkREabU4Fqg\njMS4V3iLFMEnwAdLoat6BVyqL0tEWUZh/NrpdjSSyCNNFsRXKzB8AvwwKvQgyb+X\npyaVJsj7NBNZPmXy3m7min0sfkHsDcJJed9DhsUVFiRsFYuxqdLeR78/THRCM1b8\nwlwfm9DJqwKBgFNTjZTnTcnHxAVIiHRH5OW+RZrK6XqQKhfPasxSLxp22WGXC5EV\ntw+e00JVB0gtb3KaLrSr82k2GNgDe5UqYHTZW0ztM770AdMd1KLjIHca0vexWI3O\nCSPp32vg6F3cH2Yax9BpUxADsvU3/ElsEmv4oygKEF9Od5OwYy9JV1zhAoGBAJ7D\nckcgMKB5+Q2UxqSIH9V3/EDSEdzNOiMsaWyX3ZAuGhMVNxuI+KVudT7RMNYZBEr9\n3Qpohs1Oiipg7bhIGcNA2NABUPYaJvT1DaUc4Xr+vXDIuOBdGwd7UfNYb7bdbIO/\nKaQUBLlT0gj0LUfgfHegYs3OpofUX687Mnv9HzeNAoGBAIfmozdKmarvGkDhbFX9\nz80alL84Z4eCAegDDMeO9Tl4nscmMKyRqticTy7P63lmbtf59/bet5ZB6xiGXHQE\nqy9IkjnriRqnrloyYljq2OfD50wib7DOYGYj9En/sTNsVIF+Fho6mJSvbwi1R5Af\n1tlxWGvKRGBWKqtS9IlITsEo\n-----END PRIVATE KEY-----\n",
      apiKey: "AIzaSyDxeBfI9VQSE-8N1kpqy-Bh9_4KKFR2Xcw",
      authDomain: "infyshield-fb795.firebaseapp.com",
      projectId: "infyshield-fb795",
      storageBucket: "infyshield-fb795.appspot.com",
      messagingSenderId: "534803786950",
      appId: "1:534803786950:web:657316a2e2c89bfdd33bc7",
      measurementId: "G-D97L324TQ0",
      client_email : "firebase-adminsdk-lerlt@infyshield-fb795.iam.gserviceaccount.com",
    };
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    this.messaging = admin.messaging();
  }

  async sendFCMNotification(token: string, title: string, body: string) {
    const message = {
      notification: {
        title,
        body,
      },
      token,
    };
    try {
      await this.messaging.send(message);
    } catch (error) {
      console.error('Error sending FCM notification:', error);
      throw error; // Handle the error as needed
    }
  }

  async updatePaymentHistory(collectionName: string, data: any): Promise<void> {
    const collectionRef = this.db.collection(collectionName);
    await collectionRef.add(data);
  }
}
