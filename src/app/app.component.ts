import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  votos = 0;
  candidatos = [
    { id: 1, sujeto: "ella", nombre: "Isabella Ruíz", votos: 0, foto: 'assets/images/candidato' + 1 + ".jpg", slogan: "Hola, yo soy Isabella" },
    { id: 2, sujeto: "ella", nombre: "Nathalie Rodríguez", votos: 0, foto: 'assets/images/candidato' + 2 + ".jpg", slogan: "Hola, yo soy Nathalie" },
    { id: 3, sujeto: "él", nombre: "James Cai Xu", votos: 0, foto: 'assets/images/candidato' + 3 + ".jpg", slogan: "Hola, yo soy James" },
    { id: 4, sujeto: "él", nombre: "Esteban Salamanca", votos: 0, foto: 'assets/images/candidato' + 4 + ".jpg", slogan: "Hola, yo soy Esteban" },
    { id: 6, sujeto: "ella", nombre: "Mariana Blanco", votos: 0, foto: 'assets/images/candidato' + 5 + ".jpg", slogan: "Hola, yo soy Mariana" },
    { id: 5, sujeto: "él", nombre: "Mathias González", votos: 0, foto: 'assets/images/candidato' + 6 + ".jpg", slogan: "Hola, yo soy Mathias" },
  ]

  constructor(private http: HttpClient) {
    this.http.post("http://localhost:3000/getVotos", {}).toPromise().then((res: any) => {
      let can = res.candidatos;
      this.actualizarVotos(can);
    }).catch(err => {
      console.error(err);
    });

  }

  votar(candidato) {
    this.http.post("http://localhost:3000/votar", { id: candidato.id }).toPromise().then((res: any) => {
      alert("Bravo, has votado por " + candidato.nombre);
      this.reOrganizar();
      this.actualizarVotos(res.candidatos);
    }).catch(err => {
      console.error(err);
    });


  }

  reOrganizar(){
    this.shuffle(this.candidatos);
  }

  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }


  actualizarVotos(lista) {
    lista.forEach(c => {
      this.candidatos.forEach(c1 => {
        if (c1.id == c.id) {
          c1.votos = c.votos;
        }
      });
    });
    this.calcularTotalVotos();
  }


  calcularTotalVotos() {
    this.votos = 0;
    this.candidatos.forEach(c1 => {
      this.votos += c1.votos;
    });
  }
}


