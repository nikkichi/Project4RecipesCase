import * as Models from './generated_models'
import * as Immutable from 'immutable'
import * as Moment from 'moment'
import 'whatwg-fetch'

export type ItemWithEditable<T> = {Item:T, Editable:boolean, JustCreated:boolean}

export type RawPage<T> = {
  Items:ItemWithEditable<T>[]
  PageIndex:number
  SearchQuery:string
  NumPages:number
  PageSize:number
  TotalCount:number
  CanCreate:boolean
  CanDelete:boolean
}

export let parse_date = <T>(e:any) : T&{CreatedDate:Moment.Moment} => { return { ...e, CreatedDate: Moment.utc(e.CreatedDate) }}

export let make_page = <T>(res:any, parse_other_args:(e:any) => T) : RawPage<T> => { return {
  Items: res.Items.map((i:any) => { return{ ...i, Item:parse_date(i.Item)} }).map((i:any) => { return{ ...i, Item:parse_other_args(i.Item)} }),
  PageIndex: res.PageIndex,
  SearchQuery:res.SearchQuery,
  NumPages: res.NumPages,
  PageSize: res.PageSize,
  TotalCount: res.TotalCount,
  CanCreate: res.CanCreate,
  CanDelete: res.CanDelete
}}

export async function create_Thirty() : Promise<Models.Thirty> {
  let res = await fetch(`/api/v1/Thirty/`,
    { method: 'post', credentials: 'include', headers:{'content-type': 'application/json',
      'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Thirty
}

export async function update_Thirty(item:Models.Thirty) : Promise<void> {
  let res = await fetch(`/api/v1/Thirty/`, { method: 'put',
      body: JSON.stringify({...item, CreatedDate:undefined, }), credentials: 'include', headers:{'content-type': 'application/json', 'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function delete_Thirty(source:Models.Thirty) : Promise<void> {
  let res = await fetch(`/api/v1/Thirty/${source.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json', 'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function get_Thirty(id:number) : Promise<ItemWithEditable<Models.Thirty>> {
  let res = await fetch(`/api/v1/Thirty/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return { Item: {...json.Item, CreatedDate: Moment.utc(json.Item.CreatedDate),  } as Models.Thirty,
           Editable: !!json.Editable, JustCreated:false }
}

export async function get_Thirties(page_index:number, page_size:number, search_query:string = null) : Promise<RawPage<Models.Thirty>> {
  let res = await fetch(`/api/v1/Thirty?page_index=${page_index}&page_size=${page_size}${(search_query != null ? "&page_size=" + search_query : "")}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })

  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Thirty>(json, e => { return {...e, }})
}







  
  
export async function get_Meal_Cuisine_Meals(source:Models.Meal, page_index:number, page_size:number, query_string:string = null) : Promise<RawPage<Models.Cuisine>> {
  let res = await fetch(`/api/v1/Meal/${source.Id}/Cuisine_Meals?page_index=${page_index}&page_size=${page_size}${(query_string != null ? "&search_query=" + query_string : "")}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Cuisine>(json, e => { return {...e, }})
}

export async function get_Meal_Cuisine_Meals_Cuisine(source:Models.Meal, page_index:number, page_size:number, id:number) : Promise<Models.Cuisine> {
  let res = await fetch(`/api/v1/Meal/${source.Id}/Cuisine_Meals/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Cuisine
}

export async function get_Meal_Cuisine_Meals_Cuisine_by_id(source:Models.Meal, id:number) : Promise<Models.Cuisine> {
  let res = await fetch(`/api/v1/Meal/${source.Id}/Cuisine_Meals/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Cuisine
}


export async function get_unlinked_Meal_Cuisine_Meals(source:Models.Meal, page_index:number, page_size:number) : Promise<RawPage<Models.Cuisine>> {
  let res = await fetch(`/api/v1/Meal/${source.Id}/unlinked/Cuisine_Meals?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Cuisine>(json, e => { return {...e, }})
}
export async function get_unlinked_Meal_Cuisine_Meals_Asian(source:Models.Meal, page_index:number, page_size:number) : Promise<RawPage<Models.Asian>> {
  let res = await fetch(`/api/v1/Meal/${source.Id}/unlinked/Cuisine_Meals/Asian?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Asian>(json, e => { return {...e, }})
}

export async function get_unlinked_Meal_Cuisine_Meals_Mediterranean(source:Models.Meal, page_index:number, page_size:number) : Promise<RawPage<Models.Mediterranean>> {
  let res = await fetch(`/api/v1/Meal/${source.Id}/unlinked/Cuisine_Meals/Mediterranean?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Mediterranean>(json, e => { return {...e, }})
}

export async function get_unlinked_Meal_Cuisine_Meals_Grill(source:Models.Meal, page_index:number, page_size:number) : Promise<RawPage<Models.Grill>> {
  let res = await fetch(`/api/v1/Meal/${source.Id}/unlinked/Cuisine_Meals/Grill?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Grill>(json, e => { return {...e, }})
}

    
export async function create_linked_Meal_Cuisine_Meals_Asian(source:Models.Meal) : Promise<Models.Asian[]> {
  let res = await fetch(`/api/v1/Meal/${source.Id}/Cuisine_Meals_Asian`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return json.map(e => { return {...e, CreatedDate: Moment.utc(e.CreatedDate),  }}) as Models.Asian[]
}

export async function create_linked_Meal_Cuisine_Meals_Mediterranean(source:Models.Meal) : Promise<Models.Mediterranean[]> {
  let res = await fetch(`/api/v1/Meal/${source.Id}/Cuisine_Meals_Mediterranean`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return json.map(e => { return {...e, CreatedDate: Moment.utc(e.CreatedDate),  }}) as Models.Mediterranean[]
}

export async function create_linked_Meal_Cuisine_Meals_Grill(source:Models.Meal) : Promise<Models.Grill[]> {
  let res = await fetch(`/api/v1/Meal/${source.Id}/Cuisine_Meals_Grill`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return json.map(e => { return {...e, CreatedDate: Moment.utc(e.CreatedDate),  }}) as Models.Grill[]
}

export async function link_Meal_Cuisine_Meals(source:Models.Meal, target:Models.Cuisine) : Promise<void> {
  let res = await fetch(`/api/v1/Meal/${source.Id}/Cuisine_Meals/${target.Id}`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function unlink_Meal_Cuisine_Meals(source:Models.Meal, target:Models.Cuisine) : Promise<void> {
  let res = await fetch(`/api/v1/Meal/${source.Id}/Cuisine_Meals/${target.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}


export async function get_Meal_Meal_Recipes(source:Models.Meal, page_index:number, page_size:number, query_string:string = null) : Promise<RawPage<Models.Recipe>> {
  let res = await fetch(`/api/v1/Meal/${source.Id}/Meal_Recipes?page_index=${page_index}&page_size=${page_size}${(query_string != null ? "&search_query=" + query_string : "")}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Recipe>(json, e => { return {...e, }})
}

export async function get_Meal_Meal_Recipes_Recipe(source:Models.Meal, page_index:number, page_size:number, id:number) : Promise<Models.Recipe> {
  let res = await fetch(`/api/v1/Meal/${source.Id}/Meal_Recipes/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Recipe
}

export async function get_Meal_Meal_Recipes_Recipe_by_id(source:Models.Meal, id:number) : Promise<Models.Recipe> {
  let res = await fetch(`/api/v1/Meal/${source.Id}/Meal_Recipes/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Recipe
}


export async function get_unlinked_Meal_Meal_Recipes(source:Models.Meal, page_index:number, page_size:number) : Promise<RawPage<Models.Recipe>> {
  let res = await fetch(`/api/v1/Meal/${source.Id}/unlinked/Meal_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Recipe>(json, e => { return {...e, }})
}

    
export async function create_linked_Meal_Meal_Recipes_Recipe(source:Models.Meal) : Promise<Models.Recipe[]> {
  let res = await fetch(`/api/v1/Meal/${source.Id}/Meal_Recipes_Recipe`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return json.map(e => { return {...e, CreatedDate: Moment.utc(e.CreatedDate),  }}) as Models.Recipe[]
}

export async function link_Meal_Meal_Recipes(source:Models.Meal, target:Models.Recipe) : Promise<void> {
  let res = await fetch(`/api/v1/Meal/${source.Id}/Meal_Recipes/${target.Id}`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function unlink_Meal_Meal_Recipes(source:Models.Meal, target:Models.Recipe) : Promise<void> {
  let res = await fetch(`/api/v1/Meal/${source.Id}/Meal_Recipes/${target.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}


export async function create_Meal() : Promise<Models.Meal> {
  let res = await fetch(`/api/v1/Meal/`,
    { method: 'post', credentials: 'include', headers:{'content-type': 'application/json',
      'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Meal
}

export async function update_Meal(item:Models.Meal) : Promise<void> {
  let res = item.Kind == "Lunch" ? await update_Lunch(item as Models.Lunch) : item.Kind == "Brunch" ? await update_Brunch(item as Models.Brunch) : item.Kind == "Dinner" ? await update_Dinner(item as Models.Dinner) : item.Kind == "Breakfast" ? await update_Breakfast(item as Models.Breakfast) : null
  
  return
}

export async function delete_Meal(source:Models.Meal) : Promise<void> {
  let res = await fetch(`/api/v1/Meal/${source.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json', 'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function get_Meal(id:number) : Promise<ItemWithEditable<Models.Meal>> {
  let res = await fetch(`/api/v1/Meal/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return { Item: {...json.Item, CreatedDate: Moment.utc(json.Item.CreatedDate),  } as Models.Meal,
           Editable: !!json.Editable, JustCreated:false }
}

export async function get_Meals(page_index:number, page_size:number, search_query:string = null) : Promise<RawPage<Models.Meal>> {
  let res = await fetch(`/api/v1/Meal?page_index=${page_index}&page_size=${page_size}${(search_query != null ? "&page_size=" + search_query : "")}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })

  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Meal>(json, e => { return {...e, }})
}







  
  
export async function create_Asian() : Promise<Models.Asian> {
  let res = await fetch(`/api/v1/Asian/`,
    { method: 'post', credentials: 'include', headers:{'content-type': 'application/json',
      'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Asian
}

export async function update_Asian(item:Models.Asian) : Promise<void> {
  let res = await fetch(`/api/v1/Asian/`, { method: 'put',
      body: JSON.stringify({...item, CreatedDate:undefined, }), credentials: 'include', headers:{'content-type': 'application/json', 'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function delete_Asian(source:Models.Asian) : Promise<void> {
  let res = await fetch(`/api/v1/Asian/${source.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json', 'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function get_Asian(id:number) : Promise<ItemWithEditable<Models.Asian>> {
  let res = await fetch(`/api/v1/Asian/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return { Item: {...json.Item, CreatedDate: Moment.utc(json.Item.CreatedDate),  } as Models.Asian,
           Editable: !!json.Editable, JustCreated:false }
}

export async function get_Asians(page_index:number, page_size:number, search_query:string = null) : Promise<RawPage<Models.Asian>> {
  let res = await fetch(`/api/v1/Asian?page_index=${page_index}&page_size=${page_size}${(search_query != null ? "&page_size=" + search_query : "")}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })

  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Asian>(json, e => { return {...e, }})
}







  
  
export async function get_Cuisine_Cuisine_Meals(source:Models.Cuisine, page_index:number, page_size:number, query_string:string = null) : Promise<RawPage<Models.Meal>> {
  let res = await fetch(`/api/v1/Cuisine/${source.Id}/Cuisine_Meals?page_index=${page_index}&page_size=${page_size}${(query_string != null ? "&search_query=" + query_string : "")}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Meal>(json, e => { return {...e, }})
}

export async function get_Cuisine_Cuisine_Meals_Meal(source:Models.Cuisine, page_index:number, page_size:number, id:number) : Promise<Models.Meal> {
  let res = await fetch(`/api/v1/Cuisine/${source.Id}/Cuisine_Meals/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Meal
}

export async function get_Cuisine_Cuisine_Meals_Meal_by_id(source:Models.Cuisine, id:number) : Promise<Models.Meal> {
  let res = await fetch(`/api/v1/Cuisine/${source.Id}/Cuisine_Meals/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Meal
}


export async function get_unlinked_Cuisine_Cuisine_Meals(source:Models.Cuisine, page_index:number, page_size:number) : Promise<RawPage<Models.Meal>> {
  let res = await fetch(`/api/v1/Cuisine/${source.Id}/unlinked/Cuisine_Meals?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Meal>(json, e => { return {...e, }})
}
export async function get_unlinked_Cuisine_Cuisine_Meals_Lunch(source:Models.Cuisine, page_index:number, page_size:number) : Promise<RawPage<Models.Lunch>> {
  let res = await fetch(`/api/v1/Cuisine/${source.Id}/unlinked/Cuisine_Meals/Lunch?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Lunch>(json, e => { return {...e, }})
}

export async function get_unlinked_Cuisine_Cuisine_Meals_Brunch(source:Models.Cuisine, page_index:number, page_size:number) : Promise<RawPage<Models.Brunch>> {
  let res = await fetch(`/api/v1/Cuisine/${source.Id}/unlinked/Cuisine_Meals/Brunch?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Brunch>(json, e => { return {...e, }})
}

export async function get_unlinked_Cuisine_Cuisine_Meals_Dinner(source:Models.Cuisine, page_index:number, page_size:number) : Promise<RawPage<Models.Dinner>> {
  let res = await fetch(`/api/v1/Cuisine/${source.Id}/unlinked/Cuisine_Meals/Dinner?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Dinner>(json, e => { return {...e, }})
}

export async function get_unlinked_Cuisine_Cuisine_Meals_Breakfast(source:Models.Cuisine, page_index:number, page_size:number) : Promise<RawPage<Models.Breakfast>> {
  let res = await fetch(`/api/v1/Cuisine/${source.Id}/unlinked/Cuisine_Meals/Breakfast?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Breakfast>(json, e => { return {...e, }})
}

    
export async function create_linked_Cuisine_Cuisine_Meals_Lunch(source:Models.Cuisine) : Promise<Models.Lunch[]> {
  let res = await fetch(`/api/v1/Cuisine/${source.Id}/Cuisine_Meals_Lunch`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return json.map(e => { return {...e, CreatedDate: Moment.utc(e.CreatedDate),  }}) as Models.Lunch[]
}

export async function create_linked_Cuisine_Cuisine_Meals_Brunch(source:Models.Cuisine) : Promise<Models.Brunch[]> {
  let res = await fetch(`/api/v1/Cuisine/${source.Id}/Cuisine_Meals_Brunch`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return json.map(e => { return {...e, CreatedDate: Moment.utc(e.CreatedDate),  }}) as Models.Brunch[]
}

export async function create_linked_Cuisine_Cuisine_Meals_Dinner(source:Models.Cuisine) : Promise<Models.Dinner[]> {
  let res = await fetch(`/api/v1/Cuisine/${source.Id}/Cuisine_Meals_Dinner`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return json.map(e => { return {...e, CreatedDate: Moment.utc(e.CreatedDate),  }}) as Models.Dinner[]
}

export async function create_linked_Cuisine_Cuisine_Meals_Breakfast(source:Models.Cuisine) : Promise<Models.Breakfast[]> {
  let res = await fetch(`/api/v1/Cuisine/${source.Id}/Cuisine_Meals_Breakfast`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return json.map(e => { return {...e, CreatedDate: Moment.utc(e.CreatedDate),  }}) as Models.Breakfast[]
}

export async function link_Cuisine_Cuisine_Meals(source:Models.Cuisine, target:Models.Meal) : Promise<void> {
  let res = await fetch(`/api/v1/Cuisine/${source.Id}/Cuisine_Meals/${target.Id}`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function unlink_Cuisine_Cuisine_Meals(source:Models.Cuisine, target:Models.Meal) : Promise<void> {
  let res = await fetch(`/api/v1/Cuisine/${source.Id}/Cuisine_Meals/${target.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}


export async function create_Cuisine() : Promise<Models.Cuisine> {
  let res = await fetch(`/api/v1/Cuisine/`,
    { method: 'post', credentials: 'include', headers:{'content-type': 'application/json',
      'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Cuisine
}

export async function update_Cuisine(item:Models.Cuisine) : Promise<void> {
  let res = item.Kind == "Asian" ? await update_Asian(item as Models.Asian) : item.Kind == "Mediterranean" ? await update_Mediterranean(item as Models.Mediterranean) : item.Kind == "Grill" ? await update_Grill(item as Models.Grill) : null
  
  return
}

export async function delete_Cuisine(source:Models.Cuisine) : Promise<void> {
  let res = await fetch(`/api/v1/Cuisine/${source.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json', 'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function get_Cuisine(id:number) : Promise<ItemWithEditable<Models.Cuisine>> {
  let res = await fetch(`/api/v1/Cuisine/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return { Item: {...json.Item, CreatedDate: Moment.utc(json.Item.CreatedDate),  } as Models.Cuisine,
           Editable: !!json.Editable, JustCreated:false }
}

export async function get_Cuisines(page_index:number, page_size:number, search_query:string = null) : Promise<RawPage<Models.Cuisine>> {
  let res = await fetch(`/api/v1/Cuisine?page_index=${page_index}&page_size=${page_size}${(search_query != null ? "&page_size=" + search_query : "")}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })

  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Cuisine>(json, e => { return {...e, }})
}







  
  
export async function get_PreparationTime_PreparationTime_Recipes(source:Models.PreparationTime, page_index:number, page_size:number, query_string:string = null) : Promise<RawPage<Models.Recipe>> {
  let res = await fetch(`/api/v1/PreparationTime/${source.Id}/PreparationTime_Recipes?page_index=${page_index}&page_size=${page_size}${(query_string != null ? "&search_query=" + query_string : "")}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Recipe>(json, e => { return {...e, }})
}

export async function get_PreparationTime_PreparationTime_Recipes_Recipe(source:Models.PreparationTime, page_index:number, page_size:number, id:number) : Promise<Models.Recipe> {
  let res = await fetch(`/api/v1/PreparationTime/${source.Id}/PreparationTime_Recipes/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Recipe
}

export async function get_PreparationTime_PreparationTime_Recipes_Recipe_by_id(source:Models.PreparationTime, id:number) : Promise<Models.Recipe> {
  let res = await fetch(`/api/v1/PreparationTime/${source.Id}/PreparationTime_Recipes/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Recipe
}


export async function get_unlinked_PreparationTime_PreparationTime_Recipes(source:Models.PreparationTime, page_index:number, page_size:number) : Promise<RawPage<Models.Recipe>> {
  let res = await fetch(`/api/v1/PreparationTime/${source.Id}/unlinked/PreparationTime_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Recipe>(json, e => { return {...e, }})
}

    
export async function create_linked_PreparationTime_PreparationTime_Recipes_Recipe(source:Models.PreparationTime) : Promise<Models.Recipe[]> {
  let res = await fetch(`/api/v1/PreparationTime/${source.Id}/PreparationTime_Recipes_Recipe`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return json.map(e => { return {...e, CreatedDate: Moment.utc(e.CreatedDate),  }}) as Models.Recipe[]
}

export async function link_PreparationTime_PreparationTime_Recipes(source:Models.PreparationTime, target:Models.Recipe) : Promise<void> {
  let res = await fetch(`/api/v1/PreparationTime/${source.Id}/PreparationTime_Recipes/${target.Id}`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function unlink_PreparationTime_PreparationTime_Recipes(source:Models.PreparationTime, target:Models.Recipe) : Promise<void> {
  let res = await fetch(`/api/v1/PreparationTime/${source.Id}/PreparationTime_Recipes/${target.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}


export async function create_PreparationTime() : Promise<Models.PreparationTime> {
  let res = await fetch(`/api/v1/PreparationTime/`,
    { method: 'post', credentials: 'include', headers:{'content-type': 'application/json',
      'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.PreparationTime
}

export async function update_PreparationTime(item:Models.PreparationTime) : Promise<void> {
  let res = item.Kind == "Thirty" ? await update_Thirty(item as Models.Thirty) : item.Kind == "Sixty" ? await update_Sixty(item as Models.Sixty) : item.Kind == "Ninety" ? await update_Ninety(item as Models.Ninety) : item.Kind == "Fifteen" ? await update_Fifteen(item as Models.Fifteen) : null
  
  return
}

export async function delete_PreparationTime(source:Models.PreparationTime) : Promise<void> {
  let res = await fetch(`/api/v1/PreparationTime/${source.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json', 'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function get_PreparationTime(id:number) : Promise<ItemWithEditable<Models.PreparationTime>> {
  let res = await fetch(`/api/v1/PreparationTime/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return { Item: {...json.Item, CreatedDate: Moment.utc(json.Item.CreatedDate),  } as Models.PreparationTime,
           Editable: !!json.Editable, JustCreated:false }
}

export async function get_PreparationTimes(page_index:number, page_size:number, search_query:string = null) : Promise<RawPage<Models.PreparationTime>> {
  let res = await fetch(`/api/v1/PreparationTime?page_index=${page_index}&page_size=${page_size}${(search_query != null ? "&page_size=" + search_query : "")}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })

  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.PreparationTime>(json, e => { return {...e, }})
}







  
  
export async function create_Sixty() : Promise<Models.Sixty> {
  let res = await fetch(`/api/v1/Sixty/`,
    { method: 'post', credentials: 'include', headers:{'content-type': 'application/json',
      'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Sixty
}

export async function update_Sixty(item:Models.Sixty) : Promise<void> {
  let res = await fetch(`/api/v1/Sixty/`, { method: 'put',
      body: JSON.stringify({...item, CreatedDate:undefined, }), credentials: 'include', headers:{'content-type': 'application/json', 'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function delete_Sixty(source:Models.Sixty) : Promise<void> {
  let res = await fetch(`/api/v1/Sixty/${source.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json', 'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function get_Sixty(id:number) : Promise<ItemWithEditable<Models.Sixty>> {
  let res = await fetch(`/api/v1/Sixty/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return { Item: {...json.Item, CreatedDate: Moment.utc(json.Item.CreatedDate),  } as Models.Sixty,
           Editable: !!json.Editable, JustCreated:false }
}

export async function get_Sixties(page_index:number, page_size:number, search_query:string = null) : Promise<RawPage<Models.Sixty>> {
  let res = await fetch(`/api/v1/Sixty?page_index=${page_index}&page_size=${page_size}${(search_query != null ? "&page_size=" + search_query : "")}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })

  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Sixty>(json, e => { return {...e, }})
}







  
  
export async function get_RecommendationPage_User_RecommendationPages(source:Models.RecommendationPage, page_index:number, page_size:number, query_string:string = null) : Promise<RawPage<Models.User>> {
  let res = await fetch(`/api/v1/RecommendationPage/${source.Id}/User_RecommendationPages?page_index=${page_index}&page_size=${page_size}${(query_string != null ? "&search_query=" + query_string : "")}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.User>(json, e => { return {...e, }})
}

export async function get_RecommendationPage_User_RecommendationPages_User(source:Models.RecommendationPage, page_index:number, page_size:number, id:number) : Promise<Models.User> {
  let res = await fetch(`/api/v1/RecommendationPage/${source.Id}/User_RecommendationPages/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.User
}

export async function get_RecommendationPage_User_RecommendationPages_User_by_id(source:Models.RecommendationPage, id:number) : Promise<Models.User> {
  let res = await fetch(`/api/v1/RecommendationPage/${source.Id}/User_RecommendationPages/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.User
}


export async function get_unlinked_RecommendationPage_User_RecommendationPages(source:Models.RecommendationPage, page_index:number, page_size:number) : Promise<RawPage<Models.User>> {
  let res = await fetch(`/api/v1/RecommendationPage/${source.Id}/unlinked/User_RecommendationPages?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.User>(json, e => { return {...e, }})
}

    
export async function create_linked_RecommendationPage_User_RecommendationPages_User(source:Models.RecommendationPage) : Promise<Models.User[]> {
  let res = await fetch(`/api/v1/RecommendationPage/${source.Id}/User_RecommendationPages_User`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return json.map(e => { return {...e, CreatedDate: Moment.utc(e.CreatedDate),  }}) as Models.User[]
}

export async function link_RecommendationPage_User_RecommendationPages(source:Models.RecommendationPage, target:Models.User) : Promise<void> {
  let res = await fetch(`/api/v1/RecommendationPage/${source.Id}/User_RecommendationPages/${target.Id}`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function unlink_RecommendationPage_User_RecommendationPages(source:Models.RecommendationPage, target:Models.User) : Promise<void> {
  let res = await fetch(`/api/v1/RecommendationPage/${source.Id}/User_RecommendationPages/${target.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}


export async function get_RecommendationPage_RecommendationPage_Recipes(source:Models.RecommendationPage, page_index:number, page_size:number, query_string:string = null) : Promise<RawPage<Models.Recipe>> {
  let res = await fetch(`/api/v1/RecommendationPage/${source.Id}/RecommendationPage_Recipes?page_index=${page_index}&page_size=${page_size}${(query_string != null ? "&search_query=" + query_string : "")}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Recipe>(json, e => { return {...e, }})
}

export async function get_RecommendationPage_RecommendationPage_Recipes_Recipe(source:Models.RecommendationPage, page_index:number, page_size:number, id:number) : Promise<Models.Recipe> {
  let res = await fetch(`/api/v1/RecommendationPage/${source.Id}/RecommendationPage_Recipes/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Recipe
}

export async function get_RecommendationPage_RecommendationPage_Recipes_Recipe_by_id(source:Models.RecommendationPage, id:number) : Promise<Models.Recipe> {
  let res = await fetch(`/api/v1/RecommendationPage/${source.Id}/RecommendationPage_Recipes/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Recipe
}


export async function get_unlinked_RecommendationPage_RecommendationPage_Recipes(source:Models.RecommendationPage, page_index:number, page_size:number) : Promise<RawPage<Models.Recipe>> {
  let res = await fetch(`/api/v1/RecommendationPage/${source.Id}/unlinked/RecommendationPage_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Recipe>(json, e => { return {...e, }})
}

    
export async function create_linked_RecommendationPage_RecommendationPage_Recipes_Recipe(source:Models.RecommendationPage) : Promise<Models.Recipe[]> {
  let res = await fetch(`/api/v1/RecommendationPage/${source.Id}/RecommendationPage_Recipes_Recipe`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return json.map(e => { return {...e, CreatedDate: Moment.utc(e.CreatedDate),  }}) as Models.Recipe[]
}

export async function link_RecommendationPage_RecommendationPage_Recipes(source:Models.RecommendationPage, target:Models.Recipe) : Promise<void> {
  let res = await fetch(`/api/v1/RecommendationPage/${source.Id}/RecommendationPage_Recipes/${target.Id}`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function unlink_RecommendationPage_RecommendationPage_Recipes(source:Models.RecommendationPage, target:Models.Recipe) : Promise<void> {
  let res = await fetch(`/api/v1/RecommendationPage/${source.Id}/RecommendationPage_Recipes/${target.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}


export async function create_RecommendationPage() : Promise<Models.RecommendationPage> {
  let res = await fetch(`/api/v1/RecommendationPage/`,
    { method: 'post', credentials: 'include', headers:{'content-type': 'application/json',
      'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.RecommendationPage
}

export async function update_RecommendationPage(item:Models.RecommendationPage) : Promise<void> {
  let res = await fetch(`/api/v1/RecommendationPage/`, { method: 'put',
      body: JSON.stringify({...item, CreatedDate:undefined, }), credentials: 'include', headers:{'content-type': 'application/json', 'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function delete_RecommendationPage(source:Models.RecommendationPage) : Promise<void> {
  let res = await fetch(`/api/v1/RecommendationPage/${source.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json', 'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function get_RecommendationPage(id:number) : Promise<ItemWithEditable<Models.RecommendationPage>> {
  let res = await fetch(`/api/v1/RecommendationPage/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return { Item: {...json.Item, CreatedDate: Moment.utc(json.Item.CreatedDate),  } as Models.RecommendationPage,
           Editable: !!json.Editable, JustCreated:false }
}

export async function get_RecommendationPages(page_index:number, page_size:number, search_query:string = null) : Promise<RawPage<Models.RecommendationPage>> {
  let res = await fetch(`/api/v1/RecommendationPage?page_index=${page_index}&page_size=${page_size}${(search_query != null ? "&page_size=" + search_query : "")}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })

  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.RecommendationPage>(json, e => { return {...e, }})
}







  
  
export async function create_Favourite() : Promise<Models.Favourite> {
  let res = await fetch(`/api/v1/Favourite/`,
    { method: 'post', credentials: 'include', headers:{'content-type': 'application/json',
      'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Favourite
}

export async function update_Favourite(item:Models.Favourite) : Promise<void> {
  let res = await fetch(`/api/v1/Favourite/`, { method: 'put',
      body: JSON.stringify({...item, CreatedDate:undefined, }), credentials: 'include', headers:{'content-type': 'application/json', 'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function delete_Favourite(source:Models.Favourite) : Promise<void> {
  let res = await fetch(`/api/v1/Favourite/${source.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json', 'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function get_Favourite(id:number) : Promise<ItemWithEditable<Models.Favourite>> {
  let res = await fetch(`/api/v1/Favourite/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return { Item: {...json.Item, CreatedDate: Moment.utc(json.Item.CreatedDate),  } as Models.Favourite,
           Editable: !!json.Editable, JustCreated:false }
}

export async function get_Favourites(page_index:number, page_size:number, search_query:string = null) : Promise<RawPage<Models.Favourite>> {
  let res = await fetch(`/api/v1/Favourite?page_index=${page_index}&page_size=${page_size}${(search_query != null ? "&page_size=" + search_query : "")}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })

  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Favourite>(json, e => { return {...e, }})
}







  
  
export async function create_Browse() : Promise<Models.Browse> {
  let res = await fetch(`/api/v1/Browse/`,
    { method: 'post', credentials: 'include', headers:{'content-type': 'application/json',
      'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Browse
}

export async function update_Browse(item:Models.Browse) : Promise<void> {
  let res = await fetch(`/api/v1/Browse/`, { method: 'put',
      body: JSON.stringify({...item, CreatedDate:undefined, }), credentials: 'include', headers:{'content-type': 'application/json', 'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function delete_Browse(source:Models.Browse) : Promise<void> {
  let res = await fetch(`/api/v1/Browse/${source.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json', 'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function get_Browse(id:number) : Promise<ItemWithEditable<Models.Browse>> {
  let res = await fetch(`/api/v1/Browse/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return { Item: {...json.Item, CreatedDate: Moment.utc(json.Item.CreatedDate),  } as Models.Browse,
           Editable: !!json.Editable, JustCreated:false }
}

export async function get_Browses(page_index:number, page_size:number, search_query:string = null) : Promise<RawPage<Models.Browse>> {
  let res = await fetch(`/api/v1/Browse?page_index=${page_index}&page_size=${page_size}${(search_query != null ? "&page_size=" + search_query : "")}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })

  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Browse>(json, e => { return {...e, }})
}







  
  
export async function create_Lunch() : Promise<Models.Lunch> {
  let res = await fetch(`/api/v1/Lunch/`,
    { method: 'post', credentials: 'include', headers:{'content-type': 'application/json',
      'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Lunch
}

export async function update_Lunch(item:Models.Lunch) : Promise<void> {
  let res = await fetch(`/api/v1/Lunch/`, { method: 'put',
      body: JSON.stringify({...item, CreatedDate:undefined, }), credentials: 'include', headers:{'content-type': 'application/json', 'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function delete_Lunch(source:Models.Lunch) : Promise<void> {
  let res = await fetch(`/api/v1/Lunch/${source.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json', 'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function get_Lunch(id:number) : Promise<ItemWithEditable<Models.Lunch>> {
  let res = await fetch(`/api/v1/Lunch/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return { Item: {...json.Item, CreatedDate: Moment.utc(json.Item.CreatedDate),  } as Models.Lunch,
           Editable: !!json.Editable, JustCreated:false }
}

export async function get_Lunches(page_index:number, page_size:number, search_query:string = null) : Promise<RawPage<Models.Lunch>> {
  let res = await fetch(`/api/v1/Lunch?page_index=${page_index}&page_size=${page_size}${(search_query != null ? "&page_size=" + search_query : "")}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })

  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Lunch>(json, e => { return {...e, }})
}







  
  
export async function get_User_User_Recipes(source:Models.User, page_index:number, page_size:number, query_string:string = null) : Promise<RawPage<Models.Recipe>> {
  let res = await fetch(`/api/v1/User/${source.Id}/User_Recipes?page_index=${page_index}&page_size=${page_size}${(query_string != null ? "&search_query=" + query_string : "")}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Recipe>(json, e => { return {...e, }})
}

export async function get_User_User_Recipes_Recipe(source:Models.User, page_index:number, page_size:number, id:number) : Promise<Models.Recipe> {
  let res = await fetch(`/api/v1/User/${source.Id}/User_Recipes/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Recipe
}

export async function get_User_User_Recipes_Recipe_by_id(source:Models.User, id:number) : Promise<Models.Recipe> {
  let res = await fetch(`/api/v1/User/${source.Id}/User_Recipes/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Recipe
}


export async function get_unlinked_User_User_Recipes(source:Models.User, page_index:number, page_size:number) : Promise<RawPage<Models.Recipe>> {
  let res = await fetch(`/api/v1/User/${source.Id}/unlinked/User_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Recipe>(json, e => { return {...e, }})
}

    
export async function create_linked_User_User_Recipes_Recipe(source:Models.User) : Promise<Models.Recipe[]> {
  let res = await fetch(`/api/v1/User/${source.Id}/User_Recipes_Recipe`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return json.map(e => { return {...e, CreatedDate: Moment.utc(e.CreatedDate),  }}) as Models.Recipe[]
}

export async function link_User_User_Recipes(source:Models.User, target:Models.Recipe) : Promise<void> {
  let res = await fetch(`/api/v1/User/${source.Id}/User_Recipes/${target.Id}`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function unlink_User_User_Recipes(source:Models.User, target:Models.Recipe) : Promise<void> {
  let res = await fetch(`/api/v1/User/${source.Id}/User_Recipes/${target.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}


export async function get_User_User_RecommendationPages(source:Models.User, page_index:number, page_size:number, query_string:string = null) : Promise<RawPage<Models.RecommendationPage>> {
  let res = await fetch(`/api/v1/User/${source.Id}/User_RecommendationPages?page_index=${page_index}&page_size=${page_size}${(query_string != null ? "&search_query=" + query_string : "")}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.RecommendationPage>(json, e => { return {...e, }})
}

export async function get_User_User_RecommendationPages_RecommendationPage(source:Models.User, page_index:number, page_size:number, id:number) : Promise<Models.RecommendationPage> {
  let res = await fetch(`/api/v1/User/${source.Id}/User_RecommendationPages/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.RecommendationPage
}

export async function get_User_User_RecommendationPages_RecommendationPage_by_id(source:Models.User, id:number) : Promise<Models.RecommendationPage> {
  let res = await fetch(`/api/v1/User/${source.Id}/User_RecommendationPages/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.RecommendationPage
}


export async function get_unlinked_User_User_RecommendationPages(source:Models.User, page_index:number, page_size:number) : Promise<RawPage<Models.RecommendationPage>> {
  let res = await fetch(`/api/v1/User/${source.Id}/unlinked/User_RecommendationPages?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.RecommendationPage>(json, e => { return {...e, }})
}

    
export async function create_linked_User_User_RecommendationPages_RecommendationPage(source:Models.User) : Promise<Models.RecommendationPage[]> {
  let res = await fetch(`/api/v1/User/${source.Id}/User_RecommendationPages_RecommendationPage`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return json.map(e => { return {...e, CreatedDate: Moment.utc(e.CreatedDate),  }}) as Models.RecommendationPage[]
}

export async function link_User_User_RecommendationPages(source:Models.User, target:Models.RecommendationPage) : Promise<void> {
  let res = await fetch(`/api/v1/User/${source.Id}/User_RecommendationPages/${target.Id}`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function unlink_User_User_RecommendationPages(source:Models.User, target:Models.RecommendationPage) : Promise<void> {
  let res = await fetch(`/api/v1/User/${source.Id}/User_RecommendationPages/${target.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}


export async function create_User() : Promise<Models.User> {
  let res = await fetch(`/api/v1/User/`,
    { method: 'post', credentials: 'include', headers:{'content-type': 'application/json',
      'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.User
}

export async function update_User(item:Models.User) : Promise<void> {
  let res = await fetch(`/api/v1/User/`, { method: 'put',
      body: JSON.stringify({...item, CreatedDate:undefined, }), credentials: 'include', headers:{'content-type': 'application/json', 'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function delete_User(source:Models.User) : Promise<void> {
  let res = await fetch(`/api/v1/User/${source.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json', 'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function get_User(id:number) : Promise<ItemWithEditable<Models.User>> {
  let res = await fetch(`/api/v1/User/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return { Item: {...json.Item, CreatedDate: Moment.utc(json.Item.CreatedDate),  } as Models.User,
           Editable: !!json.Editable, JustCreated:false }
}

export async function get_Users(page_index:number, page_size:number, search_query:string = null) : Promise<RawPage<Models.User>> {
  let res = await fetch(`/api/v1/User?page_index=${page_index}&page_size=${page_size}${(search_query != null ? "&page_size=" + search_query : "")}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })

  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.User>(json, e => { return {...e, }})
}







export async function delete_User_sessions() : Promise<void> {
  let res = await fetch(`/api/v1/User/DeleteSessions`,
    { method: 'post', credentials: 'include',
      headers:{'content-type': 'application/json',
      'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  return
}

export async function active_User_sessions() : Promise<Array<{Item1: string, Item2: Date}>> {
  let res = await fetch(`/api/v1/User/ActiveSessions`,
    { method: 'post', credentials: 'include',
      headers:{'content-type': 'application/json',
      'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) return []
  let json = await res.json()
  return json as Array<{Item1: string, Item2: Date}>
}

export async function validate_User(username:string, email:string, email_confirmation:string) : Promise<boolean> {
  let res = await fetch(`/api/v1/User/Validate`,
    { method: 'post', credentials: 'include',
      body: JSON.stringify({Username:username, Email:email, EmailConfirmation:email_confirmation}),
      headers:{'content-type': 'application/json',
      'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) return false
  let json = await res.json()
  return !!json
}

export async function register_User(username:string, email:string, email_confirmation:string) : Promise<Models.User> {
  let res = await fetch(`/api/v1/User/Register`,
    { method: 'post', credentials: 'include',
      body: JSON.stringify({Username:username, Email:email, EmailConfirmation:email_confirmation}),
      headers:{'content-type': 'application/json',
      'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: new Date(json.CreatedDate),  } as Models.User
}

export async function login_User(username:string, email:string, password:string) : Promise<Models.User> {
  let res = await fetch(`/api/v1/User/Login`,
    { method: 'post', credentials: 'include',
      body: JSON.stringify({Username:username, Email:email, Password:password}),
      headers:{'content-type': 'application/json',
      'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: new Date(json.CreatedDate),  } as Models.User
}


export async function logout_User() : Promise<void> {
  let res = await fetch(`/api/v1/User/Logout`,
    { method: 'post', credentials: 'include',
      headers:{'content-type': 'application/json',
      'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
  return
}


export async function change_User_password(username:string, email:string, password:string, new_password:string, new_password_confirmation:string) : Promise<void> {
  let res = await fetch(`/api/v1/User/ChangePassword`,
    { method: 'post', credentials: 'include',
      body: JSON.stringify({Username:username, Email:email, Password:password, NewPassword:new_password, NewPasswordConfirmation:new_password_confirmation}),
      headers:{'content-type': 'application/json',
      'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function reset_User_password(username:string, email:string) : Promise<void> {
  let res = await fetch(`/api/v1/User/ResetPassword`,
    { method: 'post', credentials: 'include',
      body: JSON.stringify({Username:username, Email:email}),
      headers:{'content-type': 'application/json',
      'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
  return
}

    
  
  
export async function create_Homepage() : Promise<Models.Homepage> {
  let res = await fetch(`/api/v1/Homepage/`,
    { method: 'post', credentials: 'include', headers:{'content-type': 'application/json',
      'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Homepage
}

export async function update_Homepage(item:Models.Homepage) : Promise<void> {
  let res = await fetch(`/api/v1/Homepage/`, { method: 'put',
      body: JSON.stringify({...item, CreatedDate:undefined, }), credentials: 'include', headers:{'content-type': 'application/json', 'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function delete_Homepage(source:Models.Homepage) : Promise<void> {
  let res = await fetch(`/api/v1/Homepage/${source.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json', 'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function get_Homepage(id:number) : Promise<ItemWithEditable<Models.Homepage>> {
  let res = await fetch(`/api/v1/Homepage/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return { Item: {...json.Item, CreatedDate: Moment.utc(json.Item.CreatedDate),  } as Models.Homepage,
           Editable: !!json.Editable, JustCreated:false }
}

export async function get_Homepages(page_index:number, page_size:number, search_query:string = null) : Promise<RawPage<Models.Homepage>> {
  let res = await fetch(`/api/v1/Homepage?page_index=${page_index}&page_size=${page_size}${(search_query != null ? "&page_size=" + search_query : "")}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })

  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Homepage>(json, e => { return {...e, }})
}







  
  
export async function create_Brunch() : Promise<Models.Brunch> {
  let res = await fetch(`/api/v1/Brunch/`,
    { method: 'post', credentials: 'include', headers:{'content-type': 'application/json',
      'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Brunch
}

export async function update_Brunch(item:Models.Brunch) : Promise<void> {
  let res = await fetch(`/api/v1/Brunch/`, { method: 'put',
      body: JSON.stringify({...item, CreatedDate:undefined, }), credentials: 'include', headers:{'content-type': 'application/json', 'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function delete_Brunch(source:Models.Brunch) : Promise<void> {
  let res = await fetch(`/api/v1/Brunch/${source.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json', 'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function get_Brunch(id:number) : Promise<ItemWithEditable<Models.Brunch>> {
  let res = await fetch(`/api/v1/Brunch/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return { Item: {...json.Item, CreatedDate: Moment.utc(json.Item.CreatedDate),  } as Models.Brunch,
           Editable: !!json.Editable, JustCreated:false }
}

export async function get_Brunches(page_index:number, page_size:number, search_query:string = null) : Promise<RawPage<Models.Brunch>> {
  let res = await fetch(`/api/v1/Brunch?page_index=${page_index}&page_size=${page_size}${(search_query != null ? "&page_size=" + search_query : "")}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })

  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Brunch>(json, e => { return {...e, }})
}







  
  
export async function get_Recipe_Meal_Recipes(source:Models.Recipe, page_index:number, page_size:number, query_string:string = null) : Promise<RawPage<Models.Meal>> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Meal_Recipes?page_index=${page_index}&page_size=${page_size}${(query_string != null ? "&search_query=" + query_string : "")}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Meal>(json, e => { return {...e, }})
}

export async function get_Recipe_Meal_Recipes_Meal(source:Models.Recipe, page_index:number, page_size:number, id:number) : Promise<Models.Meal> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Meal_Recipes/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Meal
}

export async function get_Recipe_Meal_Recipes_Meal_by_id(source:Models.Recipe, id:number) : Promise<Models.Meal> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Meal_Recipes/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Meal
}


export async function get_unlinked_Recipe_Meal_Recipes(source:Models.Recipe, page_index:number, page_size:number) : Promise<RawPage<Models.Meal>> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/unlinked/Meal_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Meal>(json, e => { return {...e, }})
}
export async function get_unlinked_Recipe_Meal_Recipes_Lunch(source:Models.Recipe, page_index:number, page_size:number) : Promise<RawPage<Models.Lunch>> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/unlinked/Meal_Recipes/Lunch?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Lunch>(json, e => { return {...e, }})
}

export async function get_unlinked_Recipe_Meal_Recipes_Brunch(source:Models.Recipe, page_index:number, page_size:number) : Promise<RawPage<Models.Brunch>> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/unlinked/Meal_Recipes/Brunch?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Brunch>(json, e => { return {...e, }})
}

export async function get_unlinked_Recipe_Meal_Recipes_Dinner(source:Models.Recipe, page_index:number, page_size:number) : Promise<RawPage<Models.Dinner>> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/unlinked/Meal_Recipes/Dinner?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Dinner>(json, e => { return {...e, }})
}

export async function get_unlinked_Recipe_Meal_Recipes_Breakfast(source:Models.Recipe, page_index:number, page_size:number) : Promise<RawPage<Models.Breakfast>> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/unlinked/Meal_Recipes/Breakfast?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Breakfast>(json, e => { return {...e, }})
}

    
export async function create_linked_Recipe_Meal_Recipes_Lunch(source:Models.Recipe) : Promise<Models.Lunch[]> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Meal_Recipes_Lunch`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return json.map(e => { return {...e, CreatedDate: Moment.utc(e.CreatedDate),  }}) as Models.Lunch[]
}

export async function create_linked_Recipe_Meal_Recipes_Brunch(source:Models.Recipe) : Promise<Models.Brunch[]> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Meal_Recipes_Brunch`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return json.map(e => { return {...e, CreatedDate: Moment.utc(e.CreatedDate),  }}) as Models.Brunch[]
}

export async function create_linked_Recipe_Meal_Recipes_Dinner(source:Models.Recipe) : Promise<Models.Dinner[]> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Meal_Recipes_Dinner`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return json.map(e => { return {...e, CreatedDate: Moment.utc(e.CreatedDate),  }}) as Models.Dinner[]
}

export async function create_linked_Recipe_Meal_Recipes_Breakfast(source:Models.Recipe) : Promise<Models.Breakfast[]> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Meal_Recipes_Breakfast`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return json.map(e => { return {...e, CreatedDate: Moment.utc(e.CreatedDate),  }}) as Models.Breakfast[]
}

export async function link_Recipe_Meal_Recipes(source:Models.Recipe, target:Models.Meal) : Promise<void> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Meal_Recipes/${target.Id}`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function unlink_Recipe_Meal_Recipes(source:Models.Recipe, target:Models.Meal) : Promise<void> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Meal_Recipes/${target.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}


export async function get_Recipe_PreparationTime_Recipes(source:Models.Recipe, page_index:number, page_size:number, query_string:string = null) : Promise<RawPage<Models.PreparationTime>> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/PreparationTime_Recipes?page_index=${page_index}&page_size=${page_size}${(query_string != null ? "&search_query=" + query_string : "")}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.PreparationTime>(json, e => { return {...e, }})
}

export async function get_Recipe_PreparationTime_Recipes_PreparationTime(source:Models.Recipe, page_index:number, page_size:number, id:number) : Promise<Models.PreparationTime> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/PreparationTime_Recipes/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.PreparationTime
}

export async function get_Recipe_PreparationTime_Recipes_PreparationTime_by_id(source:Models.Recipe, id:number) : Promise<Models.PreparationTime> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/PreparationTime_Recipes/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.PreparationTime
}


export async function get_unlinked_Recipe_PreparationTime_Recipes(source:Models.Recipe, page_index:number, page_size:number) : Promise<RawPage<Models.PreparationTime>> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/unlinked/PreparationTime_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.PreparationTime>(json, e => { return {...e, }})
}
export async function get_unlinked_Recipe_PreparationTime_Recipes_Thirty(source:Models.Recipe, page_index:number, page_size:number) : Promise<RawPage<Models.Thirty>> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/unlinked/PreparationTime_Recipes/Thirty?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Thirty>(json, e => { return {...e, }})
}

export async function get_unlinked_Recipe_PreparationTime_Recipes_Sixty(source:Models.Recipe, page_index:number, page_size:number) : Promise<RawPage<Models.Sixty>> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/unlinked/PreparationTime_Recipes/Sixty?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Sixty>(json, e => { return {...e, }})
}

export async function get_unlinked_Recipe_PreparationTime_Recipes_Ninety(source:Models.Recipe, page_index:number, page_size:number) : Promise<RawPage<Models.Ninety>> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/unlinked/PreparationTime_Recipes/Ninety?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Ninety>(json, e => { return {...e, }})
}

export async function get_unlinked_Recipe_PreparationTime_Recipes_Fifteen(source:Models.Recipe, page_index:number, page_size:number) : Promise<RawPage<Models.Fifteen>> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/unlinked/PreparationTime_Recipes/Fifteen?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Fifteen>(json, e => { return {...e, }})
}

    
export async function create_linked_Recipe_PreparationTime_Recipes_Thirty(source:Models.Recipe) : Promise<Models.Thirty[]> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/PreparationTime_Recipes_Thirty`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return json.map(e => { return {...e, CreatedDate: Moment.utc(e.CreatedDate),  }}) as Models.Thirty[]
}

export async function create_linked_Recipe_PreparationTime_Recipes_Sixty(source:Models.Recipe) : Promise<Models.Sixty[]> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/PreparationTime_Recipes_Sixty`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return json.map(e => { return {...e, CreatedDate: Moment.utc(e.CreatedDate),  }}) as Models.Sixty[]
}

export async function create_linked_Recipe_PreparationTime_Recipes_Ninety(source:Models.Recipe) : Promise<Models.Ninety[]> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/PreparationTime_Recipes_Ninety`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return json.map(e => { return {...e, CreatedDate: Moment.utc(e.CreatedDate),  }}) as Models.Ninety[]
}

export async function create_linked_Recipe_PreparationTime_Recipes_Fifteen(source:Models.Recipe) : Promise<Models.Fifteen[]> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/PreparationTime_Recipes_Fifteen`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return json.map(e => { return {...e, CreatedDate: Moment.utc(e.CreatedDate),  }}) as Models.Fifteen[]
}

export async function link_Recipe_PreparationTime_Recipes(source:Models.Recipe, target:Models.PreparationTime) : Promise<void> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/PreparationTime_Recipes/${target.Id}`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function unlink_Recipe_PreparationTime_Recipes(source:Models.Recipe, target:Models.PreparationTime) : Promise<void> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/PreparationTime_Recipes/${target.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}


export async function get_Recipe_User_Recipes(source:Models.Recipe, page_index:number, page_size:number, query_string:string = null) : Promise<RawPage<Models.User>> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/User_Recipes?page_index=${page_index}&page_size=${page_size}${(query_string != null ? "&search_query=" + query_string : "")}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.User>(json, e => { return {...e, }})
}

export async function get_Recipe_User_Recipes_User(source:Models.Recipe, page_index:number, page_size:number, id:number) : Promise<Models.User> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/User_Recipes/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.User
}

export async function get_Recipe_User_Recipes_User_by_id(source:Models.Recipe, id:number) : Promise<Models.User> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/User_Recipes/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.User
}


export async function get_unlinked_Recipe_User_Recipes(source:Models.Recipe, page_index:number, page_size:number) : Promise<RawPage<Models.User>> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/unlinked/User_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.User>(json, e => { return {...e, }})
}

    
export async function create_linked_Recipe_User_Recipes_User(source:Models.Recipe) : Promise<Models.User[]> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/User_Recipes_User`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return json.map(e => { return {...e, CreatedDate: Moment.utc(e.CreatedDate),  }}) as Models.User[]
}

export async function link_Recipe_User_Recipes(source:Models.Recipe, target:Models.User) : Promise<void> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/User_Recipes/${target.Id}`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function unlink_Recipe_User_Recipes(source:Models.Recipe, target:Models.User) : Promise<void> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/User_Recipes/${target.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}


export async function get_Recipe_Recipe_Ratings(source:Models.Recipe, page_index:number, page_size:number, query_string:string = null) : Promise<RawPage<Models.Rating>> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Recipe_Ratings?page_index=${page_index}&page_size=${page_size}${(query_string != null ? "&search_query=" + query_string : "")}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Rating>(json, e => { return {...e, }})
}

export async function get_Recipe_Recipe_Ratings_Rating(source:Models.Recipe, page_index:number, page_size:number, id:number) : Promise<Models.Rating> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Recipe_Ratings/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Rating
}

export async function get_Recipe_Recipe_Ratings_Rating_by_id(source:Models.Recipe, id:number) : Promise<Models.Rating> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Recipe_Ratings/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Rating
}


export async function get_unlinked_Recipe_Recipe_Ratings(source:Models.Recipe, page_index:number, page_size:number) : Promise<RawPage<Models.Rating>> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/unlinked/Recipe_Ratings?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Rating>(json, e => { return {...e, }})
}

    
export async function create_linked_Recipe_Recipe_Ratings_Rating(source:Models.Recipe) : Promise<Models.Rating[]> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Recipe_Ratings_Rating`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return json.map(e => { return {...e, CreatedDate: Moment.utc(e.CreatedDate),  }}) as Models.Rating[]
}

export async function link_Recipe_Recipe_Ratings(source:Models.Recipe, target:Models.Rating) : Promise<void> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Recipe_Ratings/${target.Id}`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function unlink_Recipe_Recipe_Ratings(source:Models.Recipe, target:Models.Rating) : Promise<void> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Recipe_Ratings/${target.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}


export async function get_Recipe_RecommendationPage_Recipes(source:Models.Recipe, page_index:number, page_size:number, query_string:string = null) : Promise<RawPage<Models.RecommendationPage>> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/RecommendationPage_Recipes?page_index=${page_index}&page_size=${page_size}${(query_string != null ? "&search_query=" + query_string : "")}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.RecommendationPage>(json, e => { return {...e, }})
}

export async function get_Recipe_RecommendationPage_Recipes_RecommendationPage(source:Models.Recipe, page_index:number, page_size:number, id:number) : Promise<Models.RecommendationPage> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/RecommendationPage_Recipes/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.RecommendationPage
}

export async function get_Recipe_RecommendationPage_Recipes_RecommendationPage_by_id(source:Models.Recipe, id:number) : Promise<Models.RecommendationPage> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/RecommendationPage_Recipes/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.RecommendationPage
}


export async function get_unlinked_Recipe_RecommendationPage_Recipes(source:Models.Recipe, page_index:number, page_size:number) : Promise<RawPage<Models.RecommendationPage>> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/unlinked/RecommendationPage_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.RecommendationPage>(json, e => { return {...e, }})
}

    
export async function create_linked_Recipe_RecommendationPage_Recipes_RecommendationPage(source:Models.Recipe) : Promise<Models.RecommendationPage[]> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/RecommendationPage_Recipes_RecommendationPage`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return json.map(e => { return {...e, CreatedDate: Moment.utc(e.CreatedDate),  }}) as Models.RecommendationPage[]
}

export async function link_Recipe_RecommendationPage_Recipes(source:Models.Recipe, target:Models.RecommendationPage) : Promise<void> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/RecommendationPage_Recipes/${target.Id}`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function unlink_Recipe_RecommendationPage_Recipes(source:Models.Recipe, target:Models.RecommendationPage) : Promise<void> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/RecommendationPage_Recipes/${target.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}


export async function create_Recipe() : Promise<Models.Recipe> {
  let res = await fetch(`/api/v1/Recipe/`,
    { method: 'post', credentials: 'include', headers:{'content-type': 'application/json',
      'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Recipe
}

export async function update_Recipe(item:Models.Recipe) : Promise<void> {
  let res = await fetch(`/api/v1/Recipe/`, { method: 'put',
      body: JSON.stringify({...item, CreatedDate:undefined, Picture:""}), credentials: 'include', headers:{'content-type': 'application/json', 'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function delete_Recipe(source:Models.Recipe) : Promise<void> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json', 'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function get_Recipe(id:number) : Promise<ItemWithEditable<Models.Recipe>> {
  let res = await fetch(`/api/v1/Recipe/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return { Item: {...json.Item, CreatedDate: Moment.utc(json.Item.CreatedDate),  } as Models.Recipe,
           Editable: !!json.Editable, JustCreated:false }
}

export async function get_Recipes(page_index:number, page_size:number, search_query:string = null) : Promise<RawPage<Models.Recipe>> {
  let res = await fetch(`/api/v1/Recipe?page_index=${page_index}&page_size=${page_size}${(search_query != null ? "&page_size=" + search_query : "")}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })

  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Recipe>(json, e => { return {...e, }})
}


export async function get_Recipe_Picture(item:Models.Recipe) : Promise<string> {
  let res = await fetch(`/api/v1/Recipe/${item.Id}/Picture`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return json.Content
}

export async function update_Recipe_Picture(item:Models.Recipe, new_src:string) : Promise<void> {
  let res = await fetch(`/api/v1/Recipe/${item.Id}/Picture`, { method: 'put', body: JSON.stringify({ Content: new_src }), credentials: 'include', headers:{'content-type': 'application/json', 'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
  return
}





  
  
export async function create_Dinner() : Promise<Models.Dinner> {
  let res = await fetch(`/api/v1/Dinner/`,
    { method: 'post', credentials: 'include', headers:{'content-type': 'application/json',
      'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Dinner
}

export async function update_Dinner(item:Models.Dinner) : Promise<void> {
  let res = await fetch(`/api/v1/Dinner/`, { method: 'put',
      body: JSON.stringify({...item, CreatedDate:undefined, }), credentials: 'include', headers:{'content-type': 'application/json', 'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function delete_Dinner(source:Models.Dinner) : Promise<void> {
  let res = await fetch(`/api/v1/Dinner/${source.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json', 'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function get_Dinner(id:number) : Promise<ItemWithEditable<Models.Dinner>> {
  let res = await fetch(`/api/v1/Dinner/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return { Item: {...json.Item, CreatedDate: Moment.utc(json.Item.CreatedDate),  } as Models.Dinner,
           Editable: !!json.Editable, JustCreated:false }
}

export async function get_Dinners(page_index:number, page_size:number, search_query:string = null) : Promise<RawPage<Models.Dinner>> {
  let res = await fetch(`/api/v1/Dinner?page_index=${page_index}&page_size=${page_size}${(search_query != null ? "&page_size=" + search_query : "")}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })

  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Dinner>(json, e => { return {...e, }})
}







  
  
export async function create_Mediterranean() : Promise<Models.Mediterranean> {
  let res = await fetch(`/api/v1/Mediterranean/`,
    { method: 'post', credentials: 'include', headers:{'content-type': 'application/json',
      'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Mediterranean
}

export async function update_Mediterranean(item:Models.Mediterranean) : Promise<void> {
  let res = await fetch(`/api/v1/Mediterranean/`, { method: 'put',
      body: JSON.stringify({...item, CreatedDate:undefined, }), credentials: 'include', headers:{'content-type': 'application/json', 'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function delete_Mediterranean(source:Models.Mediterranean) : Promise<void> {
  let res = await fetch(`/api/v1/Mediterranean/${source.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json', 'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function get_Mediterranean(id:number) : Promise<ItemWithEditable<Models.Mediterranean>> {
  let res = await fetch(`/api/v1/Mediterranean/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return { Item: {...json.Item, CreatedDate: Moment.utc(json.Item.CreatedDate),  } as Models.Mediterranean,
           Editable: !!json.Editable, JustCreated:false }
}

export async function get_Mediterraneans(page_index:number, page_size:number, search_query:string = null) : Promise<RawPage<Models.Mediterranean>> {
  let res = await fetch(`/api/v1/Mediterranean?page_index=${page_index}&page_size=${page_size}${(search_query != null ? "&page_size=" + search_query : "")}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })

  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Mediterranean>(json, e => { return {...e, }})
}







  
  
export async function create_Ninety() : Promise<Models.Ninety> {
  let res = await fetch(`/api/v1/Ninety/`,
    { method: 'post', credentials: 'include', headers:{'content-type': 'application/json',
      'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Ninety
}

export async function update_Ninety(item:Models.Ninety) : Promise<void> {
  let res = await fetch(`/api/v1/Ninety/`, { method: 'put',
      body: JSON.stringify({...item, CreatedDate:undefined, }), credentials: 'include', headers:{'content-type': 'application/json', 'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function delete_Ninety(source:Models.Ninety) : Promise<void> {
  let res = await fetch(`/api/v1/Ninety/${source.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json', 'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function get_Ninety(id:number) : Promise<ItemWithEditable<Models.Ninety>> {
  let res = await fetch(`/api/v1/Ninety/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return { Item: {...json.Item, CreatedDate: Moment.utc(json.Item.CreatedDate),  } as Models.Ninety,
           Editable: !!json.Editable, JustCreated:false }
}

export async function get_Nineties(page_index:number, page_size:number, search_query:string = null) : Promise<RawPage<Models.Ninety>> {
  let res = await fetch(`/api/v1/Ninety?page_index=${page_index}&page_size=${page_size}${(search_query != null ? "&page_size=" + search_query : "")}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })

  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Ninety>(json, e => { return {...e, }})
}







  
  
export async function create_Breakfast() : Promise<Models.Breakfast> {
  let res = await fetch(`/api/v1/Breakfast/`,
    { method: 'post', credentials: 'include', headers:{'content-type': 'application/json',
      'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Breakfast
}

export async function update_Breakfast(item:Models.Breakfast) : Promise<void> {
  let res = await fetch(`/api/v1/Breakfast/`, { method: 'put',
      body: JSON.stringify({...item, CreatedDate:undefined, }), credentials: 'include', headers:{'content-type': 'application/json', 'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function delete_Breakfast(source:Models.Breakfast) : Promise<void> {
  let res = await fetch(`/api/v1/Breakfast/${source.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json', 'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function get_Breakfast(id:number) : Promise<ItemWithEditable<Models.Breakfast>> {
  let res = await fetch(`/api/v1/Breakfast/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return { Item: {...json.Item, CreatedDate: Moment.utc(json.Item.CreatedDate),  } as Models.Breakfast,
           Editable: !!json.Editable, JustCreated:false }
}

export async function get_Breakfasts(page_index:number, page_size:number, search_query:string = null) : Promise<RawPage<Models.Breakfast>> {
  let res = await fetch(`/api/v1/Breakfast?page_index=${page_index}&page_size=${page_size}${(search_query != null ? "&page_size=" + search_query : "")}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })

  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Breakfast>(json, e => { return {...e, }})
}







  
  
export async function create_Fifteen() : Promise<Models.Fifteen> {
  let res = await fetch(`/api/v1/Fifteen/`,
    { method: 'post', credentials: 'include', headers:{'content-type': 'application/json',
      'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Fifteen
}

export async function update_Fifteen(item:Models.Fifteen) : Promise<void> {
  let res = await fetch(`/api/v1/Fifteen/`, { method: 'put',
      body: JSON.stringify({...item, CreatedDate:undefined, }), credentials: 'include', headers:{'content-type': 'application/json', 'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function delete_Fifteen(source:Models.Fifteen) : Promise<void> {
  let res = await fetch(`/api/v1/Fifteen/${source.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json', 'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function get_Fifteen(id:number) : Promise<ItemWithEditable<Models.Fifteen>> {
  let res = await fetch(`/api/v1/Fifteen/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return { Item: {...json.Item, CreatedDate: Moment.utc(json.Item.CreatedDate),  } as Models.Fifteen,
           Editable: !!json.Editable, JustCreated:false }
}

export async function get_Fifteens(page_index:number, page_size:number, search_query:string = null) : Promise<RawPage<Models.Fifteen>> {
  let res = await fetch(`/api/v1/Fifteen?page_index=${page_index}&page_size=${page_size}${(search_query != null ? "&page_size=" + search_query : "")}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })

  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Fifteen>(json, e => { return {...e, }})
}







  
  
export async function get_Rating_Recipe_Ratings(source:Models.Rating, page_index:number, page_size:number, query_string:string = null) : Promise<RawPage<Models.Recipe>> {
  let res = await fetch(`/api/v1/Rating/${source.Id}/Recipe_Ratings?page_index=${page_index}&page_size=${page_size}${(query_string != null ? "&search_query=" + query_string : "")}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Recipe>(json, e => { return {...e, }})
}

export async function get_Rating_Recipe_Ratings_Recipe(source:Models.Rating, page_index:number, page_size:number, id:number) : Promise<Models.Recipe> {
  let res = await fetch(`/api/v1/Rating/${source.Id}/Recipe_Ratings/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Recipe
}

export async function get_Rating_Recipe_Ratings_Recipe_by_id(source:Models.Rating, id:number) : Promise<Models.Recipe> {
  let res = await fetch(`/api/v1/Rating/${source.Id}/Recipe_Ratings/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Recipe
}


export async function get_unlinked_Rating_Recipe_Ratings(source:Models.Rating, page_index:number, page_size:number) : Promise<RawPage<Models.Recipe>> {
  let res = await fetch(`/api/v1/Rating/${source.Id}/unlinked/Recipe_Ratings?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Recipe>(json, e => { return {...e, }})
}

    
export async function create_linked_Rating_Recipe_Ratings_Recipe(source:Models.Rating) : Promise<Models.Recipe[]> {
  let res = await fetch(`/api/v1/Rating/${source.Id}/Recipe_Ratings_Recipe`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return json.map(e => { return {...e, CreatedDate: Moment.utc(e.CreatedDate),  }}) as Models.Recipe[]
}

export async function link_Rating_Recipe_Ratings(source:Models.Rating, target:Models.Recipe) : Promise<void> {
  let res = await fetch(`/api/v1/Rating/${source.Id}/Recipe_Ratings/${target.Id}`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function unlink_Rating_Recipe_Ratings(source:Models.Rating, target:Models.Recipe) : Promise<void> {
  let res = await fetch(`/api/v1/Rating/${source.Id}/Recipe_Ratings/${target.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}


export async function create_Rating() : Promise<Models.Rating> {
  let res = await fetch(`/api/v1/Rating/`,
    { method: 'post', credentials: 'include', headers:{'content-type': 'application/json',
      'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Rating
}

export async function update_Rating(item:Models.Rating) : Promise<void> {
  let res = await fetch(`/api/v1/Rating/`, { method: 'put',
      body: JSON.stringify({...item, CreatedDate:undefined, }), credentials: 'include', headers:{'content-type': 'application/json', 'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function delete_Rating(source:Models.Rating) : Promise<void> {
  let res = await fetch(`/api/v1/Rating/${source.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json', 'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function get_Rating(id:number) : Promise<ItemWithEditable<Models.Rating>> {
  let res = await fetch(`/api/v1/Rating/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return { Item: {...json.Item, CreatedDate: Moment.utc(json.Item.CreatedDate),  } as Models.Rating,
           Editable: !!json.Editable, JustCreated:false }
}

export async function get_Ratings(page_index:number, page_size:number, search_query:string = null) : Promise<RawPage<Models.Rating>> {
  let res = await fetch(`/api/v1/Rating?page_index=${page_index}&page_size=${page_size}${(search_query != null ? "&page_size=" + search_query : "")}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })

  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Rating>(json, e => { return {...e, }})
}







  
  
export async function create_Grill() : Promise<Models.Grill> {
  let res = await fetch(`/api/v1/Grill/`,
    { method: 'post', credentials: 'include', headers:{'content-type': 'application/json',
      'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Grill
}

export async function update_Grill(item:Models.Grill) : Promise<void> {
  let res = await fetch(`/api/v1/Grill/`, { method: 'put',
      body: JSON.stringify({...item, CreatedDate:undefined, }), credentials: 'include', headers:{'content-type': 'application/json', 'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function delete_Grill(source:Models.Grill) : Promise<void> {
  let res = await fetch(`/api/v1/Grill/${source.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json', 'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function get_Grill(id:number) : Promise<ItemWithEditable<Models.Grill>> {
  let res = await fetch(`/api/v1/Grill/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return { Item: {...json.Item, CreatedDate: Moment.utc(json.Item.CreatedDate),  } as Models.Grill,
           Editable: !!json.Editable, JustCreated:false }
}

export async function get_Grills(page_index:number, page_size:number, search_query:string = null) : Promise<RawPage<Models.Grill>> {
  let res = await fetch(`/api/v1/Grill?page_index=${page_index}&page_size=${page_size}${(search_query != null ? "&page_size=" + search_query : "")}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })

  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Grill>(json, e => { return {...e, }})
}







  
  
  