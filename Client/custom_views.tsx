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
type RecComponentProps = {props:ViewUtils.EntityComponentProps<Models.Recommendation>}
type RecComponentState = { i : number, j : number, recipes : Immutable.List<Models.Recipe> }

/**async function getRating (user_id: number): Promise<Immutable.List<number>> {
    let res = await fetch ('customcontroller/getrating/${user_id}', {method:'get', credentials: 'include', headers: {'content-type': 'application/json'}})
    let json = await res.json()
    Api.link_User_User_Recipes() //how to add linked recipes
    Api.get_User_User_Recipes() //return all linked recipes
    
    return Immutable.List<number>(json)
}**/


type Rate = {value : number, state:boolean}


type StarsComponentProps = {}
type StarsComponentState = {stars:Immutable.List<Rate>}
export class StarsComponent extends React.Component<StarsComponentProps, StarsComponentState> {
  constructor(props:StarsComponentProps, context:any) {
    super(props, context)
    this.state = { stars:Immutable.List<Rate>([{value : 1, state:false}, {value : 2, state:false}, {value : 3, state:false}, {value : 4, state:false}, {value : 5, state:false}]) }
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

export class CuisineComponent extends React.Component<{cuisine: Models.Cuisine},{is_expanded:boolean}> {
    constructor( props, context) {
        super(props,context)
        this.state = {is_expanded: false}
    }

    update_me(value) {
        this.setState({... this.state, is_expanded: value})
    }

    render() {
        return (<span style={{marginLeft: 10, marginTop: 10}}>
                {!this.state.is_expanded?<button onClick={()=>this.update_me(true)}>{this.props.cuisine.Kind}</button>:
                                         <button onClick={()=>this.update_me(false)}>Close {this.props.cuisine.Kind}</button>}
                {this.state.is_expanded?<Meals cuisine={this.props.cuisine}/>:<span/>}
            </span>)
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
        return <span>
            <div><h1>Choose cuisine</h1></div>
            <view style={{flex: 1, flexDirection: 'row'}}>
                {this.state.cuisines.map(r => <CuisineComponent cuisine={r} /> )} 
            </view>        
        </span>
    }
}

export class MealsComponent extends React.Component<{meal: Models.Meal},{is_expanded:boolean}> {
    constructor( props, context) {
        super(props,context)
        this.state = {is_expanded: false}
    }

    update_me(value) {
        this.setState({... this.state, is_expanded: value})
    }

    render() {
        return <span style={{marginLeft: 10, marginTop: 10}}>
                {!this.state.is_expanded?<button onClick={()=>this.update_me(true)}>{this.props.meal.Kind}</button>:
                                         <button onClick={()=>this.update_me(false)}>Close {this.props.meal.Kind}</button>}
                {this.state.is_expanded?<Recipes meal={this.props.meal}/>:<span/>}
            </span>
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
            <div style={{marginTop: 10}}>{this.state.meals.map(r => <MealsComponent meal={r}/>)}</div>
        </div>
    }
}

export class RecipesComponent extends React.Component<{recipe: Models.Recipe},{is_expanded:boolean}> {
    constructor( props, context) {
        super(props,context)
        this.state = {is_expanded:false}
    }

    update_me(value) {
        this.setState({... this.state, is_expanded: value})
    }

    render() {
        return <div> <br />
            <h2>{this.props.recipe.Name}</h2>
                {!this.state.is_expanded?<button onClick={()=>this.update_me(true)}>+</button>:
                                         <button onClick={()=>this.update_me(false)}>Close </button>}
                {this.state.is_expanded?<Info ingredients={this.props.recipe.Ingredients}
                                        info={this.props.recipe.Description} />:<span/>}
            </div>
    }
}

export class Recipes extends React.Component<{meal: Models.Meal}, {recipes: Immutable.List<Models.Recipe>}> {
    constructor( props, context) {
        super(props, context)
        this.state = {
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

export class Info extends React.Component<{ingredients: string, info: string},{}> {
    constructor( props, context) {
        super(props, context)
        this.state = {}
    }


    render(){
        return <div>
                <div><h3>Ingredients</h3></div>
                <div>{this.props.ingredients}</div>
                <br />
                <div><h3>Description</h3></div>
                <div>{this.props.info}</div>
                <br />
                <div><h3>Rate</h3></div>
                <div><StarsComponent /></div>
            </div>
    }
}

export default class IComponent extends React.Component<IComponentProps, IComponentState>{
    constructor(props: IComponentProps, context){
        super(props, context)
        this.state = { i : 0, j : 1, recipes : Immutable.List<Models.Recipe>() }
    }

    componentWillMount(){
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
                                                    info={item.info} />)}
            </div>
    }
}

class ItemComponent extends React.Component<{title:string, ingredients:string, info:string}, {is_expanded:boolean}>{
    constructor(props: {title:string, ingredients: string, info:string, is_expanded:boolean }, context)
    {
        super(props, context)
        this.state = { is_expanded: false}
    }     

    update_me(value) {
        this.setState({... this.state, is_expanded: value})
    }

    render(){
        return <div >
                <span><h1>{this.props.title}</h1></span>
                {this.state.is_expanded?<div><h2>Ingredients</h2>{this.props.ingredients}<br/><h2>Description</h2>{this.props.info}<br/><h2>Rate</h2><br/><div><StarsComponent/></div></div>:<span/>}
                {!this.state.is_expanded?<button onClick={()=>this.update_me(true)}>+</button>:
                                         <button onClick={()=>this.update_me(false)}>-</button>}
            </div>
    }
}


export  class RecComponent extends React.Component<RecComponentProps, RecComponentState>{
    constructor(props: RecComponentProps, context){
        super(props, context)
        this.state = { i : 0, j : 1, recipes : Immutable.List<Models.Recipe>() }
    }

    componentWillMount(){
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


export let AppTest = (props:ViewUtils.EntityComponentProps<Models.Homepage>) => {return <IComponent props={props}/>}
export let FavouriteView = (props:ViewUtils.EntityComponentProps<Models.Favourite>) => <div><div>hello favourite</div> <button> Greg </button>  </div>
export let BrowseView    = (props:ViewUtils.EntityComponentProps<Models.Browse>) => {return <BrowseComponent />}
export let RecView       = (props:ViewUtils.EntityComponentProps<Models.Recommendation>) =>{return <RecComponent props={props}/>}
        // console.log(this.props.props)
        // if(this.props.props.current_User == undefined) return <div>Log in first ...</div>