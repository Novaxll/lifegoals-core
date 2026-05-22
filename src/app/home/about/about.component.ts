import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  standalone: false
})
export class AboutComponent {
  user = {
    nombre: "Víctor Gustavo Reyes Vidal",
    edad: 19,
    estudio: "Software Engineering",
    ubicacion: "Córdoba, Veracruz",
    intereses: ["Java", "Spring Boot", "Software Architecture", "Cybersecurity"]
  };
}
