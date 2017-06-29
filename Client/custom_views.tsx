import * as React from "react"
import * as ReactDOM from "react-dom"
import * as Immutable from "immutable"
import * as List from './containers/list'
import * as Models from './generated_models'
import * as Api from './generated_api'
import * as ViewUtils from './generated_views/view_utils'


type IComponentProps = {props:ViewUtils.EntityComponentProps<Models.Homepage>}
type IComponentState = { i : number, j : number, recipes : Immutable.List<Models.Recipe> }
type BrowseComponentProps = {props:ViewUtils.EntityComponentProps<Models.Browse>}
type BrowseComponentState = { i : number, j : number, recipes : Immutable.List<Models.Recipe>}



type Rate = {value : number, state:boolean}


type StarsComponentProps = {}
type StarsComponentState = {stars:Immutable.List<Rate>}
export class StarsComponent extends React.Component<StarsComponentProps, StarsComponentState> {
  constructor(props:StarsComponentProps, context:any) {
    super(props, context)
    this.state = { stars:Immutable.List<Rate>([{value : 0, state:false}, {value : 1, state:false}, {value : 2, state:false}, {value : 3, state:false}, {value : 4, state:false}]) }
  }
  
  render(){
    return <div>{this.state.stars.map(star => <button onClick={() => this.setState({...this.state, stars: this.state.stars.map(star1 => {if(star1.value <= star.value) return {...star1, state: true}; else return {...star1, state: false}}).toList()})}  
                                                      style={star.state?{
                                                                          borderColor: '#000066',
                                                                          backgroundColor: '#08ABCE',
                                                                          borderWidth: 1,
                                                                          borderRadius: 10,
                                                                          color: 'white',
                                                                        }:
                                                                        {
                                                                          borderColor: '#000066',
                                                                          borderWidth: 1,
                                                                          borderRadius: 10,
                                                                          color: 'black',
                                                                        }}
                                                      marginHeight={10} marginWidth={10} width={10} height={10}>{star.value}</button>)} </div>
  }

}

export class CuisineComponent extends React.Component<{cuisine: Models.Cuisine},{}> {
    constructor( props, context) {
        super(props,context)
        this.state = {}
    }

    render() {
        return <div>
            <div><h1>{this.props.cuisine.Kind}</h1></div>
            <div><Meals cuisine={this.props.cuisine}/></div>
        </div>
    }
}

export class Cuisines extends React.Component<{}, { cuisines: Immutable.List<Models.Cuisine> }> {
    constructor( props, context) {
        super(props, context)
        this.state = {
            cuisines: Immutable.List<Models.Cuisine>()
        }
    }
    
    componentWillMount() {
        this.get_cuisines().then(online_cuisines => this.setState({... this.state, cuisines: online_cuisines}))
    }

    async get_cuisines() {
        let cuisine_page = await Api.get_Cuisines(0, 100)
        let loaded_cuisines = Immutable.List<Models.Cuisine>(cuisine_page.Items.map(r => r.Item))

        for (let i = 1 ; i < cuisine_page.NumPages; i++) {
            let cuisines = await Api.get_Cuisines(i, 100)
            loaded_cuisines = loaded_cuisines.concat(Immutable.List<Models.Cuisine>(cuisines.Items.map( r => r.Item))).toList()
        }
        return Immutable.List<Models.Cuisine>(loaded_cuisines)
    }
    
    render() {
        return <div>
            <div>{this.state.cuisines.map(r => <div><CuisineComponent cuisine={r} /></div> )}</div>             
        </div>
    }
}

export class MealsComponent extends React.Component<{meal: Models.Meal},{}> {
    constructor( props, context) {
        super(props,context)
        this.state = {}
    }

    render() {
        return <div>
            <div><h2>{this.props.meal.Kind}</h2></div>
            <div><Recipes meal={this.props.meal}/></div>
        </div>
    }
}

export class Meals extends React.Component<{cuisine: Models.Cuisine}, {meals: Immutable.List<Models.Meal> }> {
    constructor( props, context) {
        super(props, context)
        this.state = {
            meals: Immutable.List<Models.Meal>()
        }
    }

    componentWillMount() {
        this.get_meals().then(online_meals => this.setState({... this.state, meals: online_meals}))
    }

    async get_meals() {
        let meal_page = await Api.get_Cuisine_Cuisine_Meals(this.props.cuisine, 0 , 100)
        let loaded_meals = Immutable.List<Models.Meal>(meal_page.Items.map(r => r.Item))

        for (let i = 1; i < meal_page.NumPages; i++) {
            let meals = await Api.get_Cuisine_Cuisine_Meals(this.props.cuisine, 0, 100)
            loaded_meals = loaded_meals.concat(Immutable.List<Models.Meal>(meals.Items.map( r => r.Item))).toList()
        }
        return Immutable.List<Models.Meal>(loaded_meals)
    }

    render() {
        return <div>
            <div>{this.state.meals.map(r => <MealsComponent meal={r}/>)}</div>
        </div>
    }
}

export class RecipesComponent extends React.Component<{recipe: Models.Recipe},{}> {
    constructor( props, context) {
        super(props,context)
        this.state = {}
    }

    render() {
        return <div>
            <div><p>{this.props.recipe.Name}</p></div>
        </div>
    }
}

export class Recipes extends React.Component<{meal: Models.Meal}, {recipes: Immutable.List<Models.Recipe>, SearchedQuery:string}> {
    constructor( props, context) {
        super(props, context)
        this.state = {
            SearchedQuery: "",
            recipes: Immutable.List<Models.Recipe>()
        }
    }

    componentWillMount() {
        this.get_recipes().then(online_recipes => this.setState({... this.state, recipes: online_recipes}))
    }

    async get_recipes() {
        let recipe_page = await Api.get_Meal_Meal_Recipes(this.props.meal, 0, 100)
        let loaded_recipes = Immutable.List<Models.Recipe>(recipe_page.Items.map(r => r.Item))

        for (let i = 1; i < recipe_page.NumPages; i++) {
            let recipes = await Api.get_Meal_Meal_Recipes(this.props.meal, 0, 100)
            loaded_recipes = loaded_recipes.concat(Immutable.List<Models.Recipe>(recipes.Items.map( r=> r.Item))).toList()
        }
        return Immutable.List<Models.Recipe>(loaded_recipes)
    }

    render() {
        return <div>
            <div>{this.state.recipes.map(r => <RecipesComponent recipe={r}/>)}</div>
        </div>
    }
}

export class Info extends React.Component<{recipes: Models.Recipe}, {Items: Immutable.List<{title: string, ingredients: string, info: string, is_expanded: boolean}>, SearchedQuery:string}> {
    constructor( props, context) {
        super(props, context)
        this.state = {
            SearchedQuery: "",
            Items: Immutable.List<{title: string, ingredients: string, info: string, is_expanded: boolean}>()
        }
    }

    render(){

        return <div>
                <input value={this.state.SearchedQuery} onChange={event=>this.setState({...this.state, SearchedQuery: event.target.value})}/>
                {this.state.Items.filter(item => item.title.toLowerCase().includes(this.state.SearchedQuery.toLowerCase()))
                                 .map(item => <ItemComponent 
                                                    title={item.title} 
                                                    ingredients={item.ingredients}
                                                    info={item.info} 
                                                    is_expanded={item.is_expanded} 
                                                    update_me={value=>
                                                                this.setState({...this.state, 
                                                                                Items: this.state.Items.map(item1 => {
                                                                                    if(item.title == item1.title){
                                                                                        return {...item1, is_expanded: value}
                                                                                    }
                                                                                    else{ return item1}
                                                                                }).toList()})
                                                                }
                                                    />)}
            </div>
    }
}











export default class IComponent extends React.Component<IComponentProps, IComponentState>{
    constructor(props: IComponentProps, context){
        super(props, context)
        this.state = { i : 0, j : 1, recipes : Immutable.List<Models.Recipe>() }
    }

    componentWillMount(){
        var thread = setInterval(()=> {
            this.setState({... this.state, i : this.state.i + 1})
        }, 1000)

        this.get_recipes().then(online_recipes => this.setState({... this.state, recipes: online_recipes}))

    }

    async get_recipes(){
        let recipes_page = await Api.get_Recipes(0, 100)
        let loaded_recipes = Immutable.List<Models.Recipe>(recipes_page.Items.map(r => r.Item ))
        
        for (let i = 1; i < recipes_page.NumPages; i++) {
            let recipes = await Api.get_Recipes(i, 100)
            loaded_recipes = loaded_recipes.concat(Immutable.List<Models.Recipe>(recipes.Items.map( r => r.Item))).toList()
        }
        return Immutable.List<Models.Recipe>(loaded_recipes)
    }

    render(){
        console.log(this.props.props)
        if(this.props.props.current_User == undefined) return <div>Log in first ...</div>
        return <div> 
                <Cuisines/>
            </div>    
        }

}


export class BrowseComponent extends React.Component<{}, { i : number, j : number, Items:Immutable.List<{title:string, ingredients: string, info:string, is_expanded:boolean}>,SearchedQuery:string}>{
    constructor(props: BrowseComponentProps, context)
    {
        super(props, context)
        this.state = {  
            SearchedQuery:"", i : 0, j : 1,
                        Items: Immutable.List<{title:string, ingredients: string, info:string, is_expanded:boolean}>()
    } 
}    

    componentWillMount(){
        var thread = setInterval(()=> {
            this.setState({... this.state, i : this.state.i + 1})
        }, 1000)
        this.get_recipes().then(online_recipes => this.setState({... this.state, Items: online_recipes.map(recipe => { return {title:recipe.Name, ingredients:recipe.Ingredients, info:recipe.Description, is_expanded:false} }).toList()}))
    }



    async get_recipes(){
        let recipes_page = await Api.get_Recipes(0, 100)
        let loaded_recipes = Immutable.List<Models.Recipe>(recipes_page.Items.map(r => r.Item ))
        
        for (let i = 1; i < recipes_page.NumPages; i++) {
            let recipes = await Api.get_Recipes(i, 100)
            loaded_recipes = loaded_recipes.concat(Immutable.List<Models.Recipe>(recipes.Items.map( r => r.Item))).toList()
        }
        return Immutable.List<Models.Recipe>(loaded_recipes)
    }


    render(){

        return <div>
                <input value={this.state.SearchedQuery} onChange={event=>this.setState({...this.state, SearchedQuery: event.target.value})}/>
                {this.state.Items.filter(item => item.title.toLowerCase().includes(this.state.SearchedQuery.toLowerCase()))
                                 .map(item => <ItemComponent 
                                                    title={item.title} 
                                                    ingredients={item.ingredients}
                                                    info={item.info} 
                                                    is_expanded={item.is_expanded} 
                                                    update_me={value=>
                                                                this.setState({...this.state, 
                                                                                Items: this.state.Items.map(item1 => {
                                                                                    if(item.title == item1.title){
                                                                                        return {...item1, is_expanded: value}
                                                                                    }
                                                                                    else{ return item1}
                                                                                }).toList()})
                                                                }
                                                    />)}
            </div>
    }
}


class ItemComponent extends React.Component<{title:string, ingredients:string, info:string, is_expanded:boolean, update_me: (boolean) => void}, {}>{
    constructor(props: {title:string, ingredients: string, info:string, is_expanded:boolean, update_me: (boolean) => void}, context)
    {
        super(props, context)
        this.state = { }
    }     

    render(){
        return <div >
                <span><h1>{this.props.title}</h1></span>
                {this.props.is_expanded?<div><h2>Ingredients</h2>{this.props.ingredients}<br/><h2>Description</h2>{this.props.info}<br/><h2>Rate</h2><br/><div><StarsComponent/></div></div>:<span/>}
                {!this.props.is_expanded?<button onClick={()=>this.props.update_me(true)}>+</button>:
                                         <button onClick={()=>this.props.update_me(false)}>-</button>}
                </div>
    }
}


export let AppTest = (props:ViewUtils.EntityComponentProps<Models.Homepage>) => {
    return <IComponent props={props}/>
    }
export let FavouriteView = (props:ViewUtils.EntityComponentProps<Models.Favourite>) => <div><div>hello favourite</div> <button> Greg </button>  </div>
export let BrowseView    = (props:ViewUtils.EntityComponentProps<Models.Browse>) => {
    return <BrowseComponent />
}
export let RecView       = (props:ViewUtils.EntityComponentProps<Models.Recommendation>) => <div><div> Hello recommendations </div></div>