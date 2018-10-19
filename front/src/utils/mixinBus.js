import Vue from 'vue'

const internalBus = new Vue({
    methods:{
      send(mensage){
        this.$emit(mensage.event, mensage.data);
      },
      receive(event, f){
        return this.$on(event, f);
      },
      close(event){
        return this.$off(event);
      }
    }
  })

let mixin =  {
    data() {
        return {
            bus: {
                events: [],            
                receive(event, f){
                    internalBus.receive(event, f);
                    this.events.push(event);
                },
                send(event){
                    internalBus.send(event);
                }
            }
        }
    },

    destroyed(){
        for (let i = 0; i < this.bus.events.length; i++) {
            internalBus.close(this.bus.events[i]);
        }
    },
}

export default mixin