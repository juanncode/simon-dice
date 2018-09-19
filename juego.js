const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const ULTIMO_NIVEL = 10
let cantidadPuntajes = 0
let listaPuntajes = []
let intervalTimer
class Juego {
  constructor() {
    this.initClock()
    this.inicializar = this.inicializar.bind(this)
    this.inicializar()
    this.generarSecuencia()
    setTimeout(this.siguienteNivel,700)

  }
  inicializar(){
    this.siguienteNivel = this.siguienteNivel.bind(this) //agregamos bind aqui para
    //indicarle que se lleve el this del juego, ya que cuando aplicacmos setTimeout
    //el "this" cambia de valor al this de window y se vuelve undefined.
    //entonces lo que hacemos es pasarle con bind el this del juego

    this.elegirColor=this.elegirColor.bind(this)
    this.toggleBtnEmpezar()
    this.nivel = 1
    this.colores = {
      celeste,
      violeta,
      naranja,
      verde
    }
  }
  toggleBtnEmpezar(){
    if (btnEmpezar.classList.contains('hide')) {
      btnEmpezar.classList.remove('hide')
      btnEmpezar.style.visibility = 'visible';

    } else {
      btnEmpezar.classList.add('hide')
      btnEmpezar.style.visibility = 'hidden';

    }
  }
  generarSecuencia(){
    this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random()*4))
  }
  tranformarNumeroAColor(num){
    switch (num) {
      case 0:
        return 'celeste'
      case 1:
        return 'violeta'
      case 2:
        return 'naranja'
      case 3:
        return 'verde'

    }
  }
  transformarColorANumero(color){
    switch (color) {
      case 'celeste':
        return 0
      case 'violeta':
        return 1
      case 'naranja':
        return 2
      case 'verde':
        return 3

    }
  }
  siguienteNivel(){
    this.subnivel = 0
    this.iluminarSecuencia()
    this.agregarEventosClick()
  }
  iluminarColor(color){
    this.colores[color].classList.add('light')
    this.apagarColor(color)
  }
  apagarColor(color){
    setTimeout(() => {
      this.colores[color].classList.remove('light')
    },360)
  }
  agregarEventosClick(){
    this.colores.celeste.addEventListener('click',this.elegirColor)
    this.colores.verde.addEventListener('click',this.elegirColor)
    this.colores.violeta.addEventListener('click',this.elegirColor)
    this.colores.naranja.addEventListener('click',this.elegirColor)
  }
  eliminarEventosClick(){
    this.colores.celeste.removeEventListener('click',this.elegirColor)
    this.colores.verde.removeEventListener('click',this.elegirColor)
    this.colores.violeta.removeEventListener('click',this.elegirColor)
    this.colores.naranja.removeEventListener('click',this.elegirColor)
  }
  elegirColor(ev){
    const nombreColor = ev.target.dataset.color
    const numeroColor = this.transformarColorANumero(nombreColor)
    this.iluminarColor(nombreColor)
    if (numeroColor === this.secuencia[this.subnivel]) {
      this.subnivel++
      if (this.subnivel === this.nivel) {
        this.nivel++
        this.eliminarEventosClick()
        if (this.nivel === (ULTIMO_NIVEL + 1)) {
          this.ganoElJuego()
          this.addTimeItem()
        }else {
          swal("Simon dice", `Nivel ${this.nivel - 1} completado`, {
              buttons: false,
              timer: 1000,
            });
          setTimeout(this.siguienteNivel,1500)

        }

      }
    }else {
      this.perdioElJuego()
      this.addTimeItem()
    }
    console.log(this)
  }
  addTimeItem(){
    cantidadPuntajes++
    let list = document.getElementById('timeList')
    let tiempoTranscurrido = document.getElementById('timedate')
    listaPuntajes.push(tiempoTranscurrido.textContent)
    //console.log(listaPuntajes.sort((a,b) => b - a))
    list.innerHTML = ""
    for (let i = 0; i < listaPuntajes.length; i++) {
      let li = document.createElement('li')
      li.setAttribute('class','list-group-item')
      li.appendChild(document.createTextNode(`Puntaje ${i+1} : ${listaPuntajes[i]}`))
      document.innerHTML = 'br'
      list.appendChild(li)
    }
  }
  updateClock(initTime) {
    var now = new Date();
    var milli = now.getTime() - initTime;
    document.getElementById('timedate').innerHTML = milli;
  }

  initClock() {

    var initTime = new Date().getTime();
    this.updateClock(initTime);
    intervalTimer = setInterval(this.updateClock, 100, initTime);
  }
  iluminarSecuencia(){
    for (let i = 0; i < this.nivel; i++) {
      this.nivel
      const color = this.tranformarNumeroAColor(this.secuencia[i])
      setTimeout(() => {
        this.iluminarColor(color)
      },i * 1000)
    }
  }
  ganoElJuego() {
    swal("Congratulations", "¡Ganaste el Juego!", "success")
      .then(() => {
        this.inicializar()
      })
  }
  perdioElJuego() {
    clearInterval(intervalTimer)
    swal("Lo sentimos", "Perdiste el juego", "error")
      .then(() => {
        this.eliminarEventosClick()
        this.inicializar()
      })

  }
}

function empezarJuego(){
  window.juego = new Juego()


  //alert('El juego va a comenzar')

}
