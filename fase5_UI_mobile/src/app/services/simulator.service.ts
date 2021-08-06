import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Simulation } from '../shared/models/simulation.model';


const API_FOR_DETAILED_SIMULATION = '/calculoDetalhado';
const API_FOR_RESUMED_SIMULATION = '/calculoResumido';


@Injectable({ providedIn: 'root' })
export class SimulatorService {


  constructor(
    private http: HttpClient,
  ) {}

  //  GETTERS
  getResumedSimulation(initDep?: number, monthlyDep?: number, returnTime?: number): Observable <Simulation> {
    let params = new HttpParams();
    if (initDep !== null && initDep !== undefined) {
      params = params.set('depositoInicial', String(initDep));
    }
    if (monthlyDep !== null && monthlyDep !== undefined) {
      params = params.set('depositoMensal', String(monthlyDep));
    }
    if (returnTime !== null && returnTime !== undefined) {
      params = params.set('tempoResgate', String(returnTime));
    }
    return this.http
      .get<Simulation>(API_FOR_RESUMED_SIMULATION, { params });
  }

  getDetailedSimulation(initDep?: number, monthlyDep?: number, returnTime?: number) {
    let params = new HttpParams();
    if (initDep !== null && initDep !== undefined) {
      params = params.set('depositoInicial', String(initDep));
    }
    if (monthlyDep !== null && monthlyDep !== undefined) {
      params = params.set('depositoMensal', String(monthlyDep));
    }
    if (returnTime !== null && returnTime !== undefined) {
      params = params.set('tempoResgate', String(returnTime));
    }
    return this.http
      .get(API_FOR_DETAILED_SIMULATION, { params });
  }

}
