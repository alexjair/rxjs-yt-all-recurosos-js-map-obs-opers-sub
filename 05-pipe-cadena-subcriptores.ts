import {Observable, Observer, of} from 'rxjs';
import {delay, filter, map, tap, scan} from 'rxjs/operators';

/*******************[ 01 Observable-observer-subcribets  ]*********************/

//Observador
const myObserver: Observer<any> =  {
  next : x => {
    if(!isNaN(x)){ //Saber si es un Numero
      console.log("'X' es un numero.");
      console.log("Valor: ",x);
    }else{
      console.log(`'X' no es un numero. Valor = ${x}`);
    }
  },
  error: err => {
    console.error("Se produjo un error.", err);
  },
  complete: () => {
    console.log("Trabajo completado..");
  }
}

//Observable
const myObservable1 = new Observable( obs => {
    obs.next(1);
    obs.next(2);
    obs.next("Hola mensaje");
    setTimeout(() => {
      obs.next(4);
      obs.complete();
    }, 1000);
    obs.error("Respuesta de Error");
});

const myObservable2 = new Observable( obs => {
  obs.complete();
});

console.log("=>");
console.log("Run Subscribe() 001: myObservable");
console.log("-----------------------------------");
myObservable1.subscribe(myObserver);

console.log("=>");
console.log("Run Subscribe() 002: myObservable2");
console.log("-----------------------------------");
myObservable2.subscribe(myObserver);

/***************************[ 02 Operators-pipe-map  ]****************************/

//Pipe
console.log("=>");
console.log("Run pipe(): myObservable");
console.log("--------------------------");
console.log("Run map(): Map nos permite obtener y return el dato. permite en el proceso modular.");
const mypipe = myObservable1.pipe(
  filter( 
    (x:any) => !isNaN(x) //Filtro si es valido envia el dato a "Map", sin es invalido no lo envia.
  ), 
  map( 
    (x:any) =>{
      return x+100;    
    }
  ),
);

//pipe() + subcribe()
console.log("=>");
console.log("Run pipe() + subcribe()");
console.log("--------------------------");
mypipe.subscribe(myObserver);

/*******************[ 03 (pipes)operators-vs-observer.ts  ]*********************/

//Codigo normal de implementación: pipe() + subcribe()
mypipe.subscribe({
  next : x => {
    console.log(x);
  },
  error: err => {
    console.error(`Se produjo un error.`,err)
  },
  complete: () => {
    console.log('Trabajo completado.')
  },
});

//PIPES :  SON GENERICOS
//SUBCRIBE : ESPECIFICOS

/*******************[ 04 operators desicion tree.ts  ]*********************/

//El uso de Doc: 
//https://rxjs.dev/operator-decision-tree

/*******************[ 05 Pipe y cadena de subcripciones  ]*********************/

const vObs = of("Wolrd");

const vObsPipe = vObs.pipe(
  filter( x => x.includes("Hola")),
  map( x => {
    return `Hola ${x} | ` 
  }),
  tap( ev => console.log(ev + "opertors 'Tap' | ") ),
  delay(5000),
  scan( (acc, one) => acc + one, "opertors 'scan' | "),
);

vObsPipe.subscribe(console.log);