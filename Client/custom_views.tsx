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


var recipeStyle = {
    marginTop: '10%'
}

function searching (props) {
    if(props.Name.toLowerCase().indexOf('chicken') !== -1) {
        return  <div>
                    <h1>{props.Name}</h1>
                    <p>{props.Description}</p>
                </div>;
    }
    return <div></div>;
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
                
                <div> Hello {this.props.props.current_User.Username}</div>
                <div id = "recipes">
                    {this.state.recipes.map(recipe => searching(recipe) )} 
                </div> 
                <div>{this.state.i}</div>
            </div>    
        }

}


export class BrowseComponent extends React.Component<BrowseComponentProps, BrowseComponentState> {
    constructor(props: IComponentProps, context){
        super(props, context)
        this.state = { i : 0, j : 1, recipes : Immutable.List<Models.Recipe>()}
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
        return <div>               
                <div><input name='Search Recipe' type='text' /></div>
                <div id = "recipes">
                    {this.state.recipes.map(recipe => searching(recipe) )} 
                </div> 
            </div>    
        }
}
export let AppTest = (props:ViewUtils.EntityComponentProps<Models.Homepage>) => {
    return <IComponent props={props}/>
    }
export let FavouriteView = (props:ViewUtils.EntityComponentProps<Models.Favourite>) => <div><div>hello favourite</div> <button> Greg </button>  </div>
export let BrowseView    = (props:ViewUtils.EntityComponentProps<Models.Browse>) => {
    return <BrowseComponent props={props}/>
}
export let RecView       = (props:ViewUtils.EntityComponentProps<Models.Recommendation>) => <div><div> Hello recommendations </div></div>