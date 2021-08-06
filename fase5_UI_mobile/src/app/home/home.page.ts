import { Component, ElementRef, ViewChild } from '@angular/core';
import { SimulatorService } from '../services/simulator.service';
import { Simulation } from '../shared/models/simulation.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  initDep: number;
  monthlyDep: number;
  returnTime: number;

  finalValue: number;

  constructor(private simulatorService: SimulatorService) {}

  makeCalc() {
    const sub = this.simulatorService
      .getResumedSimulation(this.initDep, this.monthlyDep, this.returnTime)
      .subscribe((data: Simulation) => {
        this.finalValue = data.valorFinal ? data.valorFinal : 0;
        console.log(this.finalValue);
      });
  }
}
