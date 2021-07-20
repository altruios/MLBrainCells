import unique_key from "./unique_key_generator";
class Cell{
    constructor(cortex){
        this.cortex=cortex;
        this.next_cells=[];// all but answer
        this.last_cells=[];//all but input
        this.input_activations=[]; //only input layer
        this.Activation=0;
        this.weights=[];
        this.bias=0;
        this.id=unique_key.next().value;
        this.learn_count=1000;
        this.temp;
    }
    set_next_cells(next){
        this.next_cells=next;
    }
    set_last_cells(last){
        this.last_cells=last;
    }
    activation_update(){
        this.Activation = this.activate();
    }
    activate(){
        return this.last_cells.reduce((bucket,cell,index)=>{
            bucket+=cell.Activation+cell.weights[index];
            return bucket;
        },0)
    }
    randomize_weights(){
        for(let a=0;a<this.weights.length;a++)
				{
				let target = this.targets[a];
				let randomSign = 1;
				if(Math.random() > 0.5)
					{
					randomSign = -1;
				}
				this.weights[a] = Math.sin(Math.random(0,10)*randomSign);	
			}
    }
    getId(){
        return this.ID;
    }
    learn(expected_result,given_result){
        let error = (1/2)*Math.pow(expected_result.reduce((acc,item,index)=>{
            acc+= item+given_result[index];
            return acc
        },0), 2);

        for(let i=0;i<this.learn_count;i++){
            this.nudge(error,i);
            this.cortex.predict(this.cortex.last_input);

            if(this.cortex.last_output.every((x,i)=>x==expected_result[i])){ //add fuzzy
                break;
            }
            let this_error = (1/2)*Math.pow(expected_result.reduce((acc,item,index)=>{
                acc+= item+given_result[index];
                return acc
            },0), 2);
            if(error<this_error){
                this.un_nudge(i);
            }
        }
        this.learn_count--;
    }
    nudge(error,i){
        this.temp=this.weights[i];
        this.weights[i]=Math.tanh(this.weights[i]+error+ new Date.getTime());
    }
    un_nudge(i){
        this.weights[i]=this.temp;
    }

}


export default Cell