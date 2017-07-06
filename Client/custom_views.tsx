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
type RecommendedProps = { user : Models.User }
type RecommendedState = { recommendedrecipes: Immutable.List<Models.Recipe>}
type RecipeComponentProps = { reload:() => void, logged_in_user: Models.User, recipe: Models.Recipe, update_me: (boolean) => void, is_expanded: boolean }
type RecipeComponentState = {recipes: Immutable.List<{ recipe: Models.Recipe, is_expanded: boolean }>, rating: Immutable.List<{ recipe: Models.Rating }> }

export async function get_RecommendedRecipes(user_id: number): Promise<Immutable.List<Models.Recipe>> {
    let res = await fetch(`/api/v1/CustomController/GetRecommendedRecipes/${user_id}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } })
    let json = await res.json()
    return Immutable.List<Models.Recipe>(json) //gets 3 recommended recipes from the database
}

export async function set_rating(rating: number, recipe: number, user: number) {
 let res = await fetch(`/api/v1/CustomController/UserRating/${rating}/${recipe}/${user}`, { method: 'post', credentials: 'include', headers: { 'content-type': 'application/json' } })    
 console.log("set correct rating", rating)  //sets the rating 
}

export async function get_rating( recipe: number, user: number): Promise<Models.Rating> {
    let res = await fetch(`/api/v1/CustomController/FindRating/${recipe}/${user}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } })
    let json = await res.json()
    console.log("received correct rating", json) //gets the rating of the user out of the database
    return json
}
export async function get_cuisine( meal: number, cuisine: number): Promise<Immutable.List<Models.Recipe>> {
    let res = await fetch(`/api/v1/CustomController/FindRecipesFromMealAndCousine/${meal}/${cuisine}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } })
    let json = await res.json()
    console.log("received correct cuisine", json)  //gets the recipes of the corresponding cuisine and meal
    return Immutable.List<Models.Recipe>(json)
}

type Rate = {value : number, state:boolean} 
type StarsComponentProps = { recipe: Models.Recipe, user: Models.User} //defines what needs to be in the props
type StarsComponentState = {stars:Immutable.List<Rate>} // defines what needs to be created in the state

export class FavComponent extends React.Component<{props: Models.User,recipe: Models.Recipe},{bookmark: boolean, fav: Immutable.List<Models.Recipe>}> { //This class regulates the bookmark
    constructor( props, context) {
        super(props,context)
        this.state = {bookmark: false,
                      fav: Immutable.List<Models.Recipe>()}
    }

    change_bookmark() {  // links and unlinks the recipe from the user in the database depending on the state
        if (this.state.bookmark == true ) {
            Api.unlink_User_User_Recipes(this.props.props, this.props.recipe)
            console.log('unlink')
            return false
        }
        else {
            console.log('link')
            Api.link_User_User_Recipes(this.props.props, this.props.recipe)
            return true
        }
    }

    componentWillMount() { // sets the state of the bookmark
        this.get_fav().then(online_favs => this.setState({... this.state, bookmark: online_favs}))
    }

    async get_fav() {  //gets a list of bookmarked recipes and checks if the recipe is within the list of bookmarked recipes
        let fav_pages = await Api.get_User_User_Recipes(this.props.props, 0, 100)
        let loaded_fav = Immutable.List<Models.Recipe>(fav_pages.Items.map(r => r.Item))

        for (let i = 1; i < fav_pages.NumPages; i++) {
            let favrecipes = await Api.get_User_User_Recipes(this.props.props, i, 100)
            loaded_fav = loaded_fav.concat(Immutable.List<Models.Recipe>(favrecipes.Items.map( r => r.Item))).toList()
        }
        return loaded_fav.find(recipe => recipe.Id == this.props.recipe.Id) != undefined
    }

    render() { //makes the bookmark button and changes it if the user bookmarks the recipe
        return <div>
            <button onClick={() => this.setState({... this.state, bookmark: this.change_bookmark() })} style={this.state.bookmark?{
                                                                                borderColor: 'white',
                                                                                backgroundColor: 'white',
                                                                                borderWidth: 1,
                                                                                borderRadius: 10,
                                                                                color: 'black',
                                                                              }:
                                                                              {
                                                                                borderColor: 'white',
                                                                                borderWidth: 1,
                                                                                borderRadius: 10,
                                                                                color: 'white',
                                                                                }}
                                                                                
                                                marginHeight={10} marginWidth={10} width={10} height={10}>Bookmark</button>
        </div>
    }
}

export class StarsComponent extends React.Component<StarsComponentProps, StarsComponentState> { // this class regulates the rating feature
  constructor(props:StarsComponentProps, context:any) {
    super(props, context)
    this.state = { stars:Immutable.List<Rate>([{value : 1, state:false}, {value : 2, state:false}, {value : 3, state:false}, {value : 4, state:false}, {value : 5, state:false}]) }
  }

  componentWillMount(){ // gets the rating that the user gave to the recipe out of the database and stores it in the state
        console.log("rating is mounting")
        get_rating(this.props.recipe.Id, this.props.user.Id).then(rating => this.setState(
            {
                ...this.state, stars: this.state.stars.map(s =>{{console.log("The rating is downloading", rating)} return{value: s.value,  state : (s.value <= rating.Number) } }).toList()        
           }))

   }
  
  render(){ // regulates the rating buttons and changes it if the user rates the recipe
    return <div>{this.state.stars.map(star => <button onClickCapture={() => this.setState({...this.state, stars: this.state.stars.map(star1 => {if(star1.value <= star.value) return {...star1, state: true}; else return {...star1, state: false}}).toList()})}  
                                                      style={star.state?{
                                                                          borderColor: 'white',
                                                                          backgroundColor: 'white',
                                                                          borderWidth: 1,
                                                                          borderRadius: 15,
                                                                          color: 'black',
                                                                        }:
                                                                        {
                                                                          borderColor: 'white',
                                                                          borderWidth: 1,
                                                                          borderRadius: 15,
                                                                          color: 'white',
                                                                        }}
                                                                        onClick = {()=> set_rating(star.value, this.props.recipe.Id, this.props.user.Id)} //makes a rating and uploads it to the database
                                                      marginHeight={10} marginWidth={10} width={10} height={10}>{star.value}</button>)} </div>
  }

}

export class CuisineComponent extends React.Component<{props:ViewUtils.EntityComponentProps<Models.Homepage>,cuisine: Models.Cuisine},{is_expanded:boolean}> {// this class regulates the cuisine buttons
    constructor( props, context) {
        super(props,context)
        this.state = {is_expanded: false}
    }

    update_me(value) { //changes the state of the button
        this.setState({... this.state, is_expanded: value})
    }

    render() { //displays the button of the cuisine
        return (<span style={{marginLeft: 10, marginTop: 10}}>
                {!this.state.is_expanded?<button onClick={()=>this.update_me(true)}>{this.props.cuisine.Kind}</button>:
                                         <button onClick={()=>this.update_me(false)}>Close {this.props.cuisine.Kind}</button>}
                {this.state.is_expanded?<Meals props={this.props.props}cuisine={this.props.cuisine}/>:<span/>}
            </span>)
    }
}

export class Cuisines extends React.Component<{props:ViewUtils.EntityComponentProps<Models.Homepage>}, { cuisines: Immutable.List<Models.Cuisine> }> { // this class regulates the cuisines
    constructor( props, context) {
        super(props, context)
        this.state = {
            cuisines: Immutable.List<Models.Cuisine>()
        }
    }
    
    componentWillMount() { // stores the list of cuisines in the state
        this.get_cuisines().then(online_cuisines => this.setState({... this.state, cuisines: online_cuisines}))
    }

    async get_cuisines() { // gets a list off all the cuisines out of the database
        let cuisine_page = await Api.get_Cuisines(0, 100)
        let loaded_cuisines = Immutable.List<Models.Cuisine>(cuisine_page.Items.map(r => r.Item))

        for (let i = 1 ; i < cuisine_page.NumPages; i++) {
            let cuisines = await Api.get_Cuisines(i, 100)
            loaded_cuisines = loaded_cuisines.concat(Immutable.List<Models.Cuisine>(cuisines.Items.map( r => r.Item))).toList()
        }
        return Immutable.List<Models.Cuisine>(loaded_cuisines)
    }
    
    render() { // makes the cuisine component for each cuisine
        return <span>
            <h1>Choose cuisine</h1>
            <view style={{flex: 1, flexDirection: 'row'}}>
                {this.state.cuisines.map(r => <CuisineComponent props={this.props.props} cuisine={r} /> )} 
            </view>        
        </span>
    }
}

// this class regulates the meal buttons
export class MealsComponent extends React.Component<{cousine:Models.Cuisine, props:ViewUtils.EntityComponentProps<Models.Homepage>,meal: Models.Meal},{is_expanded:boolean}> { 
    constructor( props, context) {
        super(props,context)
        this.state = {is_expanded: false}
    }

    update_me(value) { //changes the state of the button
        this.setState({... this.state, is_expanded: value})
    }

    render() { //displays the button of the cuisine 
        return <span style={{marginLeft: 10, marginTop: 10}}>
                {!this.state.is_expanded?<button onClick={()=>this.update_me(true)}>{this.props.meal.Kind}</button>:
                                         <button onClick={()=>this.update_me(false)}>Close {this.props.meal.Kind}</button>}
                {this.state.is_expanded?<Recipes cousine={this.props.cousine} props={this.props.props} meal={this.props.meal}/>:<span/>}
            </span>
    }
}

// this class regulates the meals
export class Meals extends React.Component<{props:ViewUtils.EntityComponentProps<Models.Homepage>,cuisine: Models.Cuisine}, {meals: Immutable.List<Models.Meal> }> { 
    constructor( props, context) {
        super(props, context)
        this.state = {
            meals: Immutable.List<Models.Meal>()
        }
    }

    componentWillMount() { // this stores the list of meals in the state
        this.get_meals().then(online_meals => this.setState({... this.state, meals: online_meals}))
    }

    async get_meals() { // this gets the list of meals out of the database
        let meal_page = await Api.get_Cuisine_Cuisine_Meals(this.props.cuisine, 0 , 100)
        let loaded_meals = Immutable.List<Models.Meal>(meal_page.Items.map(r => r.Item))

        for (let i = 1; i < meal_page.NumPages; i++) {
            let meals = await Api.get_Cuisine_Cuisine_Meals(this.props.cuisine, i, 100)
            loaded_meals = loaded_meals.concat(Immutable.List<Models.Meal>(meals.Items.map( r => r.Item))).toList()
        }
        return Immutable.List<Models.Meal>(loaded_meals)
    }

    render() { // makes the mealcomponent for each meal
        return <div>
            <div style={{marginTop: 10}}>{this.state.meals.map(r => <MealsComponent cousine={this.props.cuisine} props={this.props.props} meal={r}/>)}</div>
        </div>
    }
}

// this class regulates the recipe buttons
export class RecipesComponent extends React.Component<{props: Models.User,recipe: Models.Recipe},{is_expanded:boolean}> {
    constructor( props, context) {
        super(props,context)
        this.state = {is_expanded:false}
    }

    update_me(value) { //changes the state of the button
        this.setState({... this.state, is_expanded: value})
    }

    render() { // displays the buttons of the recipe
        return <div> <br />
            <h2>{this.props.recipe.Name}</h2>
            <img src= {this.props.recipe.Picture} style={{width: "50%"}}/>
            <br/>
                {!this.state.is_expanded?<button onClick={()=>this.update_me(true)}>Show more...</button>:
                                         <button onClick={()=>this.update_me(false)}>Close </button>}
                {this.state.is_expanded?<Info props={this.props.props} recipe={this.props.recipe} />:<span/>}
            </div>
    }
}

// this class regulates the recipes
export class Recipes extends React.Component<{cousine:Models.Cuisine, props:ViewUtils.EntityComponentProps<Models.Homepage>,meal: Models.Meal}, {recipes: Immutable.List<Models.Recipe>}> {
    constructor( props, context) {
        super(props, context)
        this.state = {
            recipes: Immutable.List<Models.Recipe>()
        }
    }

    componentWillMount() {  // this gets the list of recipes corresponding to the cuisine and meal and stores it in the state
     get_cuisine(this.props.meal.Id, this.props.cousine.Id).then(online_recipes => this.setState({... this.state, recipes: online_recipes}))  
    }

    render() { // makes a recipecomponent for each recipe
        return <div>
            <div>{this.state.recipes.map(r => <RecipesComponent props={this.props.props.current_User} recipe={r}/>)}</div>
        </div>
    }
}

// this class regulates the information of the recipes
export class Info extends React.Component<{props: Models.User,recipe: Models.Recipe},{}> {
    constructor( props, context) {
        super(props, context)
        this.state = {}
    }

    render(){ // diplays the ingredients , description, bookmark and rating. It only displays the bookmark and rating if the user is logged in
        if (this.props.props == undefined)
            return <div>
                    <div><h3>Ingredients</h3></div>
                    <div>{this.props.recipe.Ingredients}</div>
                    <br />
                    <div><h3>Description</h3></div>
                    <div>{this.props.recipe.Description}</div>
                </div>
        return <div>
                    <div><h3>Ingredients</h3></div>
                    <div>{this.props.recipe.Ingredients}</div>
                    <br />
                    <div><h3>Description</h3></div>
                    <div>{this.props.recipe.Description}</div>
                    <br />
                    <div><h3>Rate</h3></div>
                    <StarsComponent recipe= {this.props.recipe} user = {this.props.props}/> 
                    <br />
                    <FavComponent props={this.props.props} recipe={this.props.recipe}/>
                </div>
    }
}

// this class regulates the each recommended recipe
class RecommendedRecipe extends React.Component<RecipeComponentProps, RecipeComponentState>{
    constructor(props: RecipeComponentProps, context) {
        super(props, context)
        this.state = {recipes: Immutable.List<{ recipe: Models.Recipe, is_expanded: boolean }>(), rating: Immutable.List<{ recipe: Models.Rating }>() }
    }
   componentWillMount() {
        console.log('right recipe is loading')
    }
    render() { // makes the recipecomponent for the recipe
        return <div>
            {console.log('Recipe')}
           <RecipesComponent props={this.props.logged_in_user} recipe={this.props.recipe}/>
        </div>
    }
}

// this class regulates the recommended recipes
class Recommended extends React.Component<RecommendedProps,  RecommendedState> {
    constructor(props: RecommendedProps, context ) {
        super(props, context)
        this.state = { recommendedrecipes: Immutable.List<Models.Recipe>() }
    }

    componentWillMount() { // gets list of recommended recipes out of the database and stores it in the state
        get_RecommendedRecipes(1).then(recommendedrecipes => 
        this.setState({...this.state,recommendedrecipes: recommendedrecipes}))
    }
      
    render() {  //makes a recommendedrecipe for each recommended recipe
        console.log("rendering", this.state.recommendedrecipes)
        return <div>{this.state.recommendedrecipes.map(item => <RecommendedRecipe
                    recipe={item}
                    is_expanded={true}
                    logged_in_user = {this.props.user}
                    reload={() => {}}
                    update_me={value => {}}/>)
                        }</div>
    }
}

// this makes regulates the homepage of the application 
export default class IComponent extends React.Component<IComponentProps, IComponentState>{
    constructor(props: IComponentProps, context){
        super(props, context)
        this.state = { i : 0, j : 1, recipes : Immutable.List<Models.Recipe>() }
    }

    render(){ // makes the cuisine class
        return <div> 
                <Cuisines props={this.props.props}/>
            </div>    
        }

}

// this class regulates the browse page of the application
export class BrowseComponent extends React.Component<{props:ViewUtils.EntityComponentProps<Models.Browse>}, {Items: Immutable.List<Models.Recipe>,SearchedQuery:string}>{
    constructor(props: BrowseComponentProps, context)
    {
        super(props, context)
        this.state = {  
            SearchedQuery:"", 
                        Items: Immutable.List<Models.Recipe>()
        } 
    }   

    componentWillMount(){ // stores the list of recipes in the state
        this.get_recipes().then(online_recipes => this.setState({... this.state, Items: online_recipes}))
    }

    async get_recipes(){ //gets a list of all the recipes out of the database
        let recipes_page = await Api.get_Recipes(0, 100)
        let loaded_recipes = Immutable.List<Models.Recipe>(recipes_page.Items.map(r => r.Item ))
        
        for (let i = 1; i < recipes_page.NumPages; i++) {
            let recipes = await Api.get_Recipes(i, 100)
            loaded_recipes = loaded_recipes.concat(Immutable.List<Models.Recipe>(recipes.Items.map( r => r.Item))).toList()
        }
        return Immutable.List<Models.Recipe>(loaded_recipes)
    }

    render(){ //makes the searchbar and makes a recipecomponent for each recipe 
        return <div>
            <div><h2>Search for recipes</h2></div>
                <input value={this.state.SearchedQuery} onChange={event=>this.setState({...this.state, SearchedQuery: event.target.value})}/>
                {this.state.Items.filter(item => item.Name.toLowerCase().includes(this.state.SearchedQuery.toLowerCase()))
                                 .map(item => <RecipesComponent props={this.props.props.current_User} recipe={item}/>)}
            </div>
    }
}

// this regulates the favourite page of the application
export class Fav extends React.Component<{props:ViewUtils.EntityComponentProps<Models.Favourite>},{ favs: Immutable.List<Models.Recipe>}> {
    constructor( props, context) {
        super(props,context)
        this.state = { favs: Immutable.List<Models.Recipe>()}
    }

    componentWillMount() { // this stores the list of bookmarked recipes in the state
        this.get_favs().then(online_favs => this.setState({... this.state, favs: online_favs}))
    }

    async get_favs() { // gets a list of all the bookmarked recipes out of the database
        let fave_page = await Api.get_User_User_Recipes(this.props.props.current_User, 0, 100)
        let loaded_fave = Immutable.List<Models.Recipe>(fave_page.Items.map(r => r.Item))

        for (let i = 1; 1 < fave_page.NumPages; i++) {
            let fav = await Api.get_User_User_Recipes(this.props.props.current_User, i, 100)
            loaded_fave = loaded_fave.concat(Immutable.List<Models.Recipe>(fav.Items.map( r => r.Item))).toList()
        }
        return Immutable.List<Models.Recipe>(loaded_fave)
    }

    render() { //makes a recipecomponent for each bookmarked recipe
        if (this.props.props.current_User == undefined) // if the user is not logged in it doesnt display a list of recipes
            return <div>
                    <div><h1>Log in first!</h1></div>
            </div>
        if (this.state.favs.size == 0)
            return <div>
                <h1>Your favourite recipes:</h1> 
                <div>You don't have any favourite recipes :^)</div>
                </div>
        return <div>
            <h1>Your favourite recipes:</h1>
            <div>{this.state.favs.map(r => <RecipesComponent props={this.props.props.current_User} recipe={r}/>)}</div>
        </div>
    }
}    



export let AppTest = (props:ViewUtils.EntityComponentProps<Models.Homepage>) => { // makes the homepage
    return <IComponent props={props}/>
    }
export let FavouriteView = (props:ViewUtils.EntityComponentProps<Models.Favourite>) => { return <Fav props={props}/> } // makes the favourite page
export let BrowseView    = (props:ViewUtils.EntityComponentProps<Models.Browse>) => { //makes the browsepage
    return <BrowseComponent props={props}/>
}
export let RecView       = (props:ViewUtils.EntityComponentProps<Models.Recommendation>) => {return <Recommended user={props.current_User}/>} // makes the recommended page