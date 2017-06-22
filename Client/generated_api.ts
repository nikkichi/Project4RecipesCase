import * as Models from './generated_models'
import * as Immutable from 'immutable'
import * as Moment from 'moment'
import 'whatwg-fetch'

export type ItemWithEditable<T> = {Item:T, Editable:boolean}

export type RawPage<T> = {
  Items:ItemWithEditable<T>[]
  PageIndex:number
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
  NumPages: res.NumPages,
  PageSize: res.PageSize,
  TotalCount: res.TotalCount,
  CanCreate: res.CanCreate,
  CanDelete: res.CanDelete
}}

export async function create_nintee() : Promise<Models.nintee> {
  let res = await fetch(`/api/v1/nintee/`,
    { method: 'post', credentials: 'include', headers:{'content-type': 'application/json',
      'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.nintee
}

export async function update_nintee(item:Models.nintee) : Promise<void> {
  let res = await fetch(`/api/v1/nintee/`, { method: 'put',
      body: JSON.stringify({...item, CreatedDate:undefined, }), credentials: 'include', headers:{'content-type': 'application/json', 'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function delete_nintee(source:Models.nintee) : Promise<void> {
  let res = await fetch(`/api/v1/nintee/${source.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json', 'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function get_nintee(id:number) : Promise<ItemWithEditable<Models.nintee>> {
  let res = await fetch(`/api/v1/nintee/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return { Item: {...json.Item, CreatedDate: Moment.utc(json.Item.CreatedDate),  } as Models.nintee,
           Editable: !!json.Editable }
}

export async function get_nintees(page_index:number, page_size:number) : Promise<RawPage<Models.nintee>> {
  let res = await fetch(`/api/v1/nintee?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.nintee>(json, e => { return {...e, }})
}







  
  
export async function create_thirty() : Promise<Models.thirty> {
  let res = await fetch(`/api/v1/thirty/`,
    { method: 'post', credentials: 'include', headers:{'content-type': 'application/json',
      'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.thirty
}

export async function update_thirty(item:Models.thirty) : Promise<void> {
  let res = await fetch(`/api/v1/thirty/`, { method: 'put',
      body: JSON.stringify({...item, CreatedDate:undefined, }), credentials: 'include', headers:{'content-type': 'application/json', 'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function delete_thirty(source:Models.thirty) : Promise<void> {
  let res = await fetch(`/api/v1/thirty/${source.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json', 'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function get_thirty(id:number) : Promise<ItemWithEditable<Models.thirty>> {
  let res = await fetch(`/api/v1/thirty/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return { Item: {...json.Item, CreatedDate: Moment.utc(json.Item.CreatedDate),  } as Models.thirty,
           Editable: !!json.Editable }
}

export async function get_thirties(page_index:number, page_size:number) : Promise<RawPage<Models.thirty>> {
  let res = await fetch(`/api/v1/thirty?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.thirty>(json, e => { return {...e, }})
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
           Editable: !!json.Editable }
}

export async function get_Meals(page_index:number, page_size:number) : Promise<RawPage<Models.Meal>> {
  let res = await fetch(`/api/v1/Meal?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Meal>(json, e => { return {...e, }})
}







  
  
export async function get_Asian_Asian_Recipes(source:Models.Asian, page_index:number, page_size:number) : Promise<RawPage<Models.Recipe>> {
  let res = await fetch(`/api/v1/Asian/${source.Id}/Asian_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Recipe>(json, e => { return {...e, }})
}

export async function get_Asian_Asian_Recipes_Recipe(source:Models.Asian, page_index:number, page_size:number, id:number) : Promise<Models.Recipe> {
  let res = await fetch(`/api/v1/Asian/${source.Id}/Asian_Recipes/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Recipe
}

export async function get_Asian_Asian_Recipes_Recipe_by_id(source:Models.Asian, id:number) : Promise<Models.Recipe> {
  let res = await fetch(`/api/v1/Asian/${source.Id}/Asian_Recipes/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Recipe
}


export async function get_unlinked_Asian_Asian_Recipes(source:Models.Asian, page_index:number, page_size:number) : Promise<RawPage<Models.Recipe>> {
  let res = await fetch(`/api/v1/Asian/${source.Id}/unlinked/Asian_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Recipe>(json, e => { return {...e, }})
}

    
export async function create_linked_Asian_Asian_Recipes_Recipe(source:Models.Asian) : Promise<Models.Recipe[]> {
  let res = await fetch(`/api/v1/Asian/${source.Id}/Asian_Recipes_Recipe`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return json.map(e => { return {...e, CreatedDate: Moment.utc(e.CreatedDate),  }}) as Models.Recipe[]
}

export async function link_Asian_Asian_Recipes(source:Models.Asian, target:Models.Recipe) : Promise<void> {
  let res = await fetch(`/api/v1/Asian/${source.Id}/Asian_Recipes/${target.Id}`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function unlink_Asian_Asian_Recipes(source:Models.Asian, target:Models.Recipe) : Promise<void> {
  let res = await fetch(`/api/v1/Asian/${source.Id}/Asian_Recipes/${target.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
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
           Editable: !!json.Editable }
}

export async function get_Asians(page_index:number, page_size:number) : Promise<RawPage<Models.Asian>> {
  let res = await fetch(`/api/v1/Asian?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Asian>(json, e => { return {...e, }})
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
           Editable: !!json.Editable }
}

export async function get_Cuisines(page_index:number, page_size:number) : Promise<RawPage<Models.Cuisine>> {
  let res = await fetch(`/api/v1/Cuisine?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Cuisine>(json, e => { return {...e, }})
}







  
  
export async function get_PreparationTime_PreparationTime_Recipes(source:Models.PreparationTime, page_index:number, page_size:number) : Promise<RawPage<Models.Recipe>> {
  let res = await fetch(`/api/v1/PreparationTime/${source.Id}/PreparationTime_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
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
  let res = item.Kind == "nintee" ? await update_nintee(item as Models.nintee) : item.Kind == "thirty" ? await update_thirty(item as Models.thirty) : item.Kind == "sixty" ? await update_sixty(item as Models.sixty) : item.Kind == "fifteen" ? await update_fifteen(item as Models.fifteen) : null
  
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
           Editable: !!json.Editable }
}

export async function get_PreparationTimes(page_index:number, page_size:number) : Promise<RawPage<Models.PreparationTime>> {
  let res = await fetch(`/api/v1/PreparationTime?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.PreparationTime>(json, e => { return {...e, }})
}







  
  
export async function create_sixty() : Promise<Models.sixty> {
  let res = await fetch(`/api/v1/sixty/`,
    { method: 'post', credentials: 'include', headers:{'content-type': 'application/json',
      'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.sixty
}

export async function update_sixty(item:Models.sixty) : Promise<void> {
  let res = await fetch(`/api/v1/sixty/`, { method: 'put',
      body: JSON.stringify({...item, CreatedDate:undefined, }), credentials: 'include', headers:{'content-type': 'application/json', 'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function delete_sixty(source:Models.sixty) : Promise<void> {
  let res = await fetch(`/api/v1/sixty/${source.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json', 'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function get_sixty(id:number) : Promise<ItemWithEditable<Models.sixty>> {
  let res = await fetch(`/api/v1/sixty/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return { Item: {...json.Item, CreatedDate: Moment.utc(json.Item.CreatedDate),  } as Models.sixty,
           Editable: !!json.Editable }
}

export async function get_sixties(page_index:number, page_size:number) : Promise<RawPage<Models.sixty>> {
  let res = await fetch(`/api/v1/sixty?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.sixty>(json, e => { return {...e, }})
}







  
  
export async function get_RecommendationPage_User_RecommendationPages(source:Models.RecommendationPage, page_index:number, page_size:number) : Promise<RawPage<Models.User>> {
  let res = await fetch(`/api/v1/RecommendationPage/${source.Id}/User_RecommendationPages?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
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


export async function get_RecommendationPage_RecommendationPage_Recipes(source:Models.RecommendationPage, page_index:number, page_size:number) : Promise<RawPage<Models.Recipe>> {
  let res = await fetch(`/api/v1/RecommendationPage/${source.Id}/RecommendationPage_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
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
           Editable: !!json.Editable }
}

export async function get_RecommendationPages(page_index:number, page_size:number) : Promise<RawPage<Models.RecommendationPage>> {
  let res = await fetch(`/api/v1/RecommendationPage?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.RecommendationPage>(json, e => { return {...e, }})
}







  
  
export async function get_Lunch_Lunch_Recipes(source:Models.Lunch, page_index:number, page_size:number) : Promise<RawPage<Models.Recipe>> {
  let res = await fetch(`/api/v1/Lunch/${source.Id}/Lunch_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Recipe>(json, e => { return {...e, }})
}

export async function get_Lunch_Lunch_Recipes_Recipe(source:Models.Lunch, page_index:number, page_size:number, id:number) : Promise<Models.Recipe> {
  let res = await fetch(`/api/v1/Lunch/${source.Id}/Lunch_Recipes/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Recipe
}

export async function get_Lunch_Lunch_Recipes_Recipe_by_id(source:Models.Lunch, id:number) : Promise<Models.Recipe> {
  let res = await fetch(`/api/v1/Lunch/${source.Id}/Lunch_Recipes/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Recipe
}


export async function get_unlinked_Lunch_Lunch_Recipes(source:Models.Lunch, page_index:number, page_size:number) : Promise<RawPage<Models.Recipe>> {
  let res = await fetch(`/api/v1/Lunch/${source.Id}/unlinked/Lunch_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Recipe>(json, e => { return {...e, }})
}

    
export async function create_linked_Lunch_Lunch_Recipes_Recipe(source:Models.Lunch) : Promise<Models.Recipe[]> {
  let res = await fetch(`/api/v1/Lunch/${source.Id}/Lunch_Recipes_Recipe`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return json.map(e => { return {...e, CreatedDate: Moment.utc(e.CreatedDate),  }}) as Models.Recipe[]
}

export async function link_Lunch_Lunch_Recipes(source:Models.Lunch, target:Models.Recipe) : Promise<void> {
  let res = await fetch(`/api/v1/Lunch/${source.Id}/Lunch_Recipes/${target.Id}`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function unlink_Lunch_Lunch_Recipes(source:Models.Lunch, target:Models.Recipe) : Promise<void> {
  let res = await fetch(`/api/v1/Lunch/${source.Id}/Lunch_Recipes/${target.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
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
           Editable: !!json.Editable }
}

export async function get_Lunches(page_index:number, page_size:number) : Promise<RawPage<Models.Lunch>> {
  let res = await fetch(`/api/v1/Lunch?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Lunch>(json, e => { return {...e, }})
}







  
  
export async function get_User_User_Favorites(source:Models.User, page_index:number, page_size:number) : Promise<RawPage<Models.Favorite>> {
  let res = await fetch(`/api/v1/User/${source.Id}/User_Favorites?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Favorite>(json, e => { return {...e, }})
}

export async function get_User_User_Favorites_Favorite(source:Models.User, page_index:number, page_size:number, id:number) : Promise<Models.Favorite> {
  let res = await fetch(`/api/v1/User/${source.Id}/User_Favorites/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Favorite
}

export async function get_User_User_Favorites_Favorite_by_id(source:Models.User, id:number) : Promise<Models.Favorite> {
  let res = await fetch(`/api/v1/User/${source.Id}/User_Favorites/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Favorite
}


export async function get_unlinked_User_User_Favorites(source:Models.User, page_index:number, page_size:number) : Promise<RawPage<Models.Favorite>> {
  let res = await fetch(`/api/v1/User/${source.Id}/unlinked/User_Favorites?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Favorite>(json, e => { return {...e, }})
}

    
export async function create_linked_User_User_Favorites_Favorite(source:Models.User) : Promise<Models.Favorite[]> {
  let res = await fetch(`/api/v1/User/${source.Id}/User_Favorites_Favorite`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return json.map(e => { return {...e, CreatedDate: Moment.utc(e.CreatedDate),  }}) as Models.Favorite[]
}

export async function link_User_User_Favorites(source:Models.User, target:Models.Favorite) : Promise<void> {
  let res = await fetch(`/api/v1/User/${source.Id}/User_Favorites/${target.Id}`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function unlink_User_User_Favorites(source:Models.User, target:Models.Favorite) : Promise<void> {
  let res = await fetch(`/api/v1/User/${source.Id}/User_Favorites/${target.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}


export async function get_User_User_Ratings(source:Models.User, page_index:number, page_size:number) : Promise<RawPage<Models.Rating>> {
  let res = await fetch(`/api/v1/User/${source.Id}/User_Ratings?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Rating>(json, e => { return {...e, }})
}

export async function get_User_User_Ratings_Rating(source:Models.User, page_index:number, page_size:number, id:number) : Promise<Models.Rating> {
  let res = await fetch(`/api/v1/User/${source.Id}/User_Ratings/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Rating
}

export async function get_User_User_Ratings_Rating_by_id(source:Models.User, id:number) : Promise<Models.Rating> {
  let res = await fetch(`/api/v1/User/${source.Id}/User_Ratings/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Rating
}


export async function get_unlinked_User_User_Ratings(source:Models.User, page_index:number, page_size:number) : Promise<RawPage<Models.Rating>> {
  let res = await fetch(`/api/v1/User/${source.Id}/unlinked/User_Ratings?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Rating>(json, e => { return {...e, }})
}

    
export async function create_linked_User_User_Ratings_Rating(source:Models.User) : Promise<Models.Rating[]> {
  let res = await fetch(`/api/v1/User/${source.Id}/User_Ratings_Rating`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return json.map(e => { return {...e, CreatedDate: Moment.utc(e.CreatedDate),  }}) as Models.Rating[]
}

export async function link_User_User_Ratings(source:Models.User, target:Models.Rating) : Promise<void> {
  let res = await fetch(`/api/v1/User/${source.Id}/User_Ratings/${target.Id}`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function unlink_User_User_Ratings(source:Models.User, target:Models.Rating) : Promise<void> {
  let res = await fetch(`/api/v1/User/${source.Id}/User_Ratings/${target.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}


export async function get_User_User_RecommendationPages(source:Models.User, page_index:number, page_size:number) : Promise<RawPage<Models.RecommendationPage>> {
  let res = await fetch(`/api/v1/User/${source.Id}/User_RecommendationPages?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
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
           Editable: !!json.Editable }
}

export async function get_Users(page_index:number, page_size:number) : Promise<RawPage<Models.User>> {
  let res = await fetch(`/api/v1/User?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.User>(json, e => { return {...e, }})
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

    
  
  
export async function get_Homepage_Homepage_Recipes(source:Models.Homepage, page_index:number, page_size:number) : Promise<RawPage<Models.Recipe>> {
  let res = await fetch(`/api/v1/Homepage/${source.Id}/Homepage_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Recipe>(json, e => { return {...e, }})
}

export async function get_Homepage_Homepage_Recipes_Recipe(source:Models.Homepage, page_index:number, page_size:number, id:number) : Promise<Models.Recipe> {
  let res = await fetch(`/api/v1/Homepage/${source.Id}/Homepage_Recipes/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Recipe
}

export async function get_Homepage_Homepage_Recipes_Recipe_by_id(source:Models.Homepage, id:number) : Promise<Models.Recipe> {
  let res = await fetch(`/api/v1/Homepage/${source.Id}/Homepage_Recipes/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Recipe
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
           Editable: !!json.Editable }
}

export async function get_Homepages(page_index:number, page_size:number) : Promise<RawPage<Models.Homepage>> {
  let res = await fetch(`/api/v1/Homepage?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Homepage>(json, e => { return {...e, }})
}







  
  
export async function get_Brunch_Brunch_Recipes(source:Models.Brunch, page_index:number, page_size:number) : Promise<RawPage<Models.Recipe>> {
  let res = await fetch(`/api/v1/Brunch/${source.Id}/Brunch_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Recipe>(json, e => { return {...e, }})
}

export async function get_Brunch_Brunch_Recipes_Recipe(source:Models.Brunch, page_index:number, page_size:number, id:number) : Promise<Models.Recipe> {
  let res = await fetch(`/api/v1/Brunch/${source.Id}/Brunch_Recipes/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Recipe
}

export async function get_Brunch_Brunch_Recipes_Recipe_by_id(source:Models.Brunch, id:number) : Promise<Models.Recipe> {
  let res = await fetch(`/api/v1/Brunch/${source.Id}/Brunch_Recipes/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Recipe
}


export async function get_unlinked_Brunch_Brunch_Recipes(source:Models.Brunch, page_index:number, page_size:number) : Promise<RawPage<Models.Recipe>> {
  let res = await fetch(`/api/v1/Brunch/${source.Id}/unlinked/Brunch_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Recipe>(json, e => { return {...e, }})
}

    
export async function create_linked_Brunch_Brunch_Recipes_Recipe(source:Models.Brunch) : Promise<Models.Recipe[]> {
  let res = await fetch(`/api/v1/Brunch/${source.Id}/Brunch_Recipes_Recipe`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return json.map(e => { return {...e, CreatedDate: Moment.utc(e.CreatedDate),  }}) as Models.Recipe[]
}

export async function link_Brunch_Brunch_Recipes(source:Models.Brunch, target:Models.Recipe) : Promise<void> {
  let res = await fetch(`/api/v1/Brunch/${source.Id}/Brunch_Recipes/${target.Id}`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function unlink_Brunch_Brunch_Recipes(source:Models.Brunch, target:Models.Recipe) : Promise<void> {
  let res = await fetch(`/api/v1/Brunch/${source.Id}/Brunch_Recipes/${target.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
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
           Editable: !!json.Editable }
}

export async function get_Brunches(page_index:number, page_size:number) : Promise<RawPage<Models.Brunch>> {
  let res = await fetch(`/api/v1/Brunch?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Brunch>(json, e => { return {...e, }})
}







  
  
export async function get_Recipe_Asian_Recipes(source:Models.Recipe, page_index:number, page_size:number) : Promise<RawPage<Models.Asian>> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Asian_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Asian>(json, e => { return {...e, }})
}

export async function get_Recipe_Asian_Recipes_Asian(source:Models.Recipe, page_index:number, page_size:number, id:number) : Promise<Models.Asian> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Asian_Recipes/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Asian
}

export async function get_Recipe_Asian_Recipes_Asian_by_id(source:Models.Recipe, id:number) : Promise<Models.Asian> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Asian_Recipes/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Asian
}


export async function get_unlinked_Recipe_Asian_Recipes(source:Models.Recipe, page_index:number, page_size:number) : Promise<RawPage<Models.Asian>> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/unlinked/Asian_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Asian>(json, e => { return {...e, }})
}

    
export async function create_linked_Recipe_Asian_Recipes_Asian(source:Models.Recipe) : Promise<Models.Asian[]> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Asian_Recipes_Asian`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return json.map(e => { return {...e, CreatedDate: Moment.utc(e.CreatedDate),  }}) as Models.Asian[]
}

export async function link_Recipe_Asian_Recipes(source:Models.Recipe, target:Models.Asian) : Promise<void> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Asian_Recipes/${target.Id}`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function unlink_Recipe_Asian_Recipes(source:Models.Recipe, target:Models.Asian) : Promise<void> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Asian_Recipes/${target.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}


export async function get_Recipe_Mediterranean_Recipes(source:Models.Recipe, page_index:number, page_size:number) : Promise<RawPage<Models.Mediterranean>> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Mediterranean_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Mediterranean>(json, e => { return {...e, }})
}

export async function get_Recipe_Mediterranean_Recipes_Mediterranean(source:Models.Recipe, page_index:number, page_size:number, id:number) : Promise<Models.Mediterranean> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Mediterranean_Recipes/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Mediterranean
}

export async function get_Recipe_Mediterranean_Recipes_Mediterranean_by_id(source:Models.Recipe, id:number) : Promise<Models.Mediterranean> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Mediterranean_Recipes/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Mediterranean
}


export async function get_unlinked_Recipe_Mediterranean_Recipes(source:Models.Recipe, page_index:number, page_size:number) : Promise<RawPage<Models.Mediterranean>> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/unlinked/Mediterranean_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Mediterranean>(json, e => { return {...e, }})
}

    
export async function create_linked_Recipe_Mediterranean_Recipes_Mediterranean(source:Models.Recipe) : Promise<Models.Mediterranean[]> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Mediterranean_Recipes_Mediterranean`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return json.map(e => { return {...e, CreatedDate: Moment.utc(e.CreatedDate),  }}) as Models.Mediterranean[]
}

export async function link_Recipe_Mediterranean_Recipes(source:Models.Recipe, target:Models.Mediterranean) : Promise<void> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Mediterranean_Recipes/${target.Id}`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function unlink_Recipe_Mediterranean_Recipes(source:Models.Recipe, target:Models.Mediterranean) : Promise<void> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Mediterranean_Recipes/${target.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}


export async function get_Recipe_Grill_Recipes(source:Models.Recipe, page_index:number, page_size:number) : Promise<RawPage<Models.Grill>> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Grill_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Grill>(json, e => { return {...e, }})
}

export async function get_Recipe_Grill_Recipes_Grill(source:Models.Recipe, page_index:number, page_size:number, id:number) : Promise<Models.Grill> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Grill_Recipes/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Grill
}

export async function get_Recipe_Grill_Recipes_Grill_by_id(source:Models.Recipe, id:number) : Promise<Models.Grill> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Grill_Recipes/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Grill
}


export async function get_unlinked_Recipe_Grill_Recipes(source:Models.Recipe, page_index:number, page_size:number) : Promise<RawPage<Models.Grill>> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/unlinked/Grill_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Grill>(json, e => { return {...e, }})
}

    
export async function create_linked_Recipe_Grill_Recipes_Grill(source:Models.Recipe) : Promise<Models.Grill[]> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Grill_Recipes_Grill`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return json.map(e => { return {...e, CreatedDate: Moment.utc(e.CreatedDate),  }}) as Models.Grill[]
}

export async function link_Recipe_Grill_Recipes(source:Models.Recipe, target:Models.Grill) : Promise<void> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Grill_Recipes/${target.Id}`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function unlink_Recipe_Grill_Recipes(source:Models.Recipe, target:Models.Grill) : Promise<void> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Grill_Recipes/${target.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}


export async function get_Recipe_Breakfast_Recipes(source:Models.Recipe, page_index:number, page_size:number) : Promise<RawPage<Models.Breakfast>> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Breakfast_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Breakfast>(json, e => { return {...e, }})
}

export async function get_Recipe_Breakfast_Recipes_Breakfast(source:Models.Recipe, page_index:number, page_size:number, id:number) : Promise<Models.Breakfast> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Breakfast_Recipes/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Breakfast
}

export async function get_Recipe_Breakfast_Recipes_Breakfast_by_id(source:Models.Recipe, id:number) : Promise<Models.Breakfast> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Breakfast_Recipes/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Breakfast
}


export async function get_unlinked_Recipe_Breakfast_Recipes(source:Models.Recipe, page_index:number, page_size:number) : Promise<RawPage<Models.Breakfast>> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/unlinked/Breakfast_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Breakfast>(json, e => { return {...e, }})
}

    
export async function create_linked_Recipe_Breakfast_Recipes_Breakfast(source:Models.Recipe) : Promise<Models.Breakfast[]> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Breakfast_Recipes_Breakfast`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return json.map(e => { return {...e, CreatedDate: Moment.utc(e.CreatedDate),  }}) as Models.Breakfast[]
}

export async function link_Recipe_Breakfast_Recipes(source:Models.Recipe, target:Models.Breakfast) : Promise<void> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Breakfast_Recipes/${target.Id}`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function unlink_Recipe_Breakfast_Recipes(source:Models.Recipe, target:Models.Breakfast) : Promise<void> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Breakfast_Recipes/${target.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}


export async function get_Recipe_Brunch_Recipes(source:Models.Recipe, page_index:number, page_size:number) : Promise<RawPage<Models.Brunch>> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Brunch_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Brunch>(json, e => { return {...e, }})
}

export async function get_Recipe_Brunch_Recipes_Brunch(source:Models.Recipe, page_index:number, page_size:number, id:number) : Promise<Models.Brunch> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Brunch_Recipes/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Brunch
}

export async function get_Recipe_Brunch_Recipes_Brunch_by_id(source:Models.Recipe, id:number) : Promise<Models.Brunch> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Brunch_Recipes/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Brunch
}


export async function get_unlinked_Recipe_Brunch_Recipes(source:Models.Recipe, page_index:number, page_size:number) : Promise<RawPage<Models.Brunch>> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/unlinked/Brunch_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Brunch>(json, e => { return {...e, }})
}

    
export async function create_linked_Recipe_Brunch_Recipes_Brunch(source:Models.Recipe) : Promise<Models.Brunch[]> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Brunch_Recipes_Brunch`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return json.map(e => { return {...e, CreatedDate: Moment.utc(e.CreatedDate),  }}) as Models.Brunch[]
}

export async function link_Recipe_Brunch_Recipes(source:Models.Recipe, target:Models.Brunch) : Promise<void> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Brunch_Recipes/${target.Id}`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function unlink_Recipe_Brunch_Recipes(source:Models.Recipe, target:Models.Brunch) : Promise<void> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Brunch_Recipes/${target.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}


export async function get_Recipe_Lunch_Recipes(source:Models.Recipe, page_index:number, page_size:number) : Promise<RawPage<Models.Lunch>> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Lunch_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Lunch>(json, e => { return {...e, }})
}

export async function get_Recipe_Lunch_Recipes_Lunch(source:Models.Recipe, page_index:number, page_size:number, id:number) : Promise<Models.Lunch> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Lunch_Recipes/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Lunch
}

export async function get_Recipe_Lunch_Recipes_Lunch_by_id(source:Models.Recipe, id:number) : Promise<Models.Lunch> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Lunch_Recipes/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Lunch
}


export async function get_unlinked_Recipe_Lunch_Recipes(source:Models.Recipe, page_index:number, page_size:number) : Promise<RawPage<Models.Lunch>> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/unlinked/Lunch_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Lunch>(json, e => { return {...e, }})
}

    
export async function create_linked_Recipe_Lunch_Recipes_Lunch(source:Models.Recipe) : Promise<Models.Lunch[]> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Lunch_Recipes_Lunch`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return json.map(e => { return {...e, CreatedDate: Moment.utc(e.CreatedDate),  }}) as Models.Lunch[]
}

export async function link_Recipe_Lunch_Recipes(source:Models.Recipe, target:Models.Lunch) : Promise<void> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Lunch_Recipes/${target.Id}`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function unlink_Recipe_Lunch_Recipes(source:Models.Recipe, target:Models.Lunch) : Promise<void> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Lunch_Recipes/${target.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}


export async function get_Recipe_Dinner_Recipes(source:Models.Recipe, page_index:number, page_size:number) : Promise<RawPage<Models.Dinner>> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Dinner_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Dinner>(json, e => { return {...e, }})
}

export async function get_Recipe_Dinner_Recipes_Dinner(source:Models.Recipe, page_index:number, page_size:number, id:number) : Promise<Models.Dinner> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Dinner_Recipes/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Dinner
}

export async function get_Recipe_Dinner_Recipes_Dinner_by_id(source:Models.Recipe, id:number) : Promise<Models.Dinner> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Dinner_Recipes/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Dinner
}


export async function get_unlinked_Recipe_Dinner_Recipes(source:Models.Recipe, page_index:number, page_size:number) : Promise<RawPage<Models.Dinner>> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/unlinked/Dinner_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Dinner>(json, e => { return {...e, }})
}

    
export async function create_linked_Recipe_Dinner_Recipes_Dinner(source:Models.Recipe) : Promise<Models.Dinner[]> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Dinner_Recipes_Dinner`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return json.map(e => { return {...e, CreatedDate: Moment.utc(e.CreatedDate),  }}) as Models.Dinner[]
}

export async function link_Recipe_Dinner_Recipes(source:Models.Recipe, target:Models.Dinner) : Promise<void> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Dinner_Recipes/${target.Id}`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function unlink_Recipe_Dinner_Recipes(source:Models.Recipe, target:Models.Dinner) : Promise<void> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Dinner_Recipes/${target.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}


export async function get_Recipe_PreparationTime_Recipes(source:Models.Recipe, page_index:number, page_size:number) : Promise<RawPage<Models.PreparationTime>> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/PreparationTime_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
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
export async function get_unlinked_Recipe_PreparationTime_Recipes_nintee(source:Models.Recipe, page_index:number, page_size:number) : Promise<RawPage<Models.nintee>> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/unlinked/PreparationTime_Recipes/nintee?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.nintee>(json, e => { return {...e, }})
}

export async function get_unlinked_Recipe_PreparationTime_Recipes_thirty(source:Models.Recipe, page_index:number, page_size:number) : Promise<RawPage<Models.thirty>> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/unlinked/PreparationTime_Recipes/thirty?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.thirty>(json, e => { return {...e, }})
}

export async function get_unlinked_Recipe_PreparationTime_Recipes_sixty(source:Models.Recipe, page_index:number, page_size:number) : Promise<RawPage<Models.sixty>> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/unlinked/PreparationTime_Recipes/sixty?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.sixty>(json, e => { return {...e, }})
}

export async function get_unlinked_Recipe_PreparationTime_Recipes_fifteen(source:Models.Recipe, page_index:number, page_size:number) : Promise<RawPage<Models.fifteen>> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/unlinked/PreparationTime_Recipes/fifteen?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.fifteen>(json, e => { return {...e, }})
}

    
export async function create_linked_Recipe_PreparationTime_Recipes_nintee(source:Models.Recipe) : Promise<Models.nintee[]> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/PreparationTime_Recipes_nintee`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return json.map(e => { return {...e, CreatedDate: Moment.utc(e.CreatedDate),  }}) as Models.nintee[]
}

export async function create_linked_Recipe_PreparationTime_Recipes_thirty(source:Models.Recipe) : Promise<Models.thirty[]> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/PreparationTime_Recipes_thirty`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return json.map(e => { return {...e, CreatedDate: Moment.utc(e.CreatedDate),  }}) as Models.thirty[]
}

export async function create_linked_Recipe_PreparationTime_Recipes_sixty(source:Models.Recipe) : Promise<Models.sixty[]> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/PreparationTime_Recipes_sixty`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return json.map(e => { return {...e, CreatedDate: Moment.utc(e.CreatedDate),  }}) as Models.sixty[]
}

export async function create_linked_Recipe_PreparationTime_Recipes_fifteen(source:Models.Recipe) : Promise<Models.fifteen[]> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/PreparationTime_Recipes_fifteen`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return json.map(e => { return {...e, CreatedDate: Moment.utc(e.CreatedDate),  }}) as Models.fifteen[]
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


export async function get_Recipe_Favorite_Recipes(source:Models.Recipe, page_index:number, page_size:number) : Promise<RawPage<Models.Favorite>> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Favorite_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Favorite>(json, e => { return {...e, }})
}

export async function get_Recipe_Favorite_Recipes_Favorite(source:Models.Recipe, page_index:number, page_size:number, id:number) : Promise<Models.Favorite> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Favorite_Recipes/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Favorite
}

export async function get_Recipe_Favorite_Recipes_Favorite_by_id(source:Models.Recipe, id:number) : Promise<Models.Favorite> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Favorite_Recipes/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Favorite
}


export async function get_unlinked_Recipe_Favorite_Recipes(source:Models.Recipe, page_index:number, page_size:number) : Promise<RawPage<Models.Favorite>> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/unlinked/Favorite_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Favorite>(json, e => { return {...e, }})
}

    
export async function create_linked_Recipe_Favorite_Recipes_Favorite(source:Models.Recipe) : Promise<Models.Favorite[]> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Favorite_Recipes_Favorite`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return json.map(e => { return {...e, CreatedDate: Moment.utc(e.CreatedDate),  }}) as Models.Favorite[]
}

export async function link_Recipe_Favorite_Recipes(source:Models.Recipe, target:Models.Favorite) : Promise<void> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Favorite_Recipes/${target.Id}`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function unlink_Recipe_Favorite_Recipes(source:Models.Recipe, target:Models.Favorite) : Promise<void> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Favorite_Recipes/${target.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}


export async function get_Recipe_Rating_Recipes(source:Models.Recipe, page_index:number, page_size:number) : Promise<RawPage<Models.Rating>> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Rating_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Rating>(json, e => { return {...e, }})
}

export async function get_Recipe_Rating_Recipes_Rating(source:Models.Recipe, page_index:number, page_size:number, id:number) : Promise<Models.Rating> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Rating_Recipes/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Rating
}

export async function get_Recipe_Rating_Recipes_Rating_by_id(source:Models.Recipe, id:number) : Promise<Models.Rating> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Rating_Recipes/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Rating
}


export async function get_unlinked_Recipe_Rating_Recipes(source:Models.Recipe, page_index:number, page_size:number) : Promise<RawPage<Models.Rating>> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/unlinked/Rating_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Rating>(json, e => { return {...e, }})
}

    
export async function create_linked_Recipe_Rating_Recipes_Rating(source:Models.Recipe) : Promise<Models.Rating[]> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Rating_Recipes_Rating`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return json.map(e => { return {...e, CreatedDate: Moment.utc(e.CreatedDate),  }}) as Models.Rating[]
}

export async function link_Recipe_Rating_Recipes(source:Models.Recipe, target:Models.Rating) : Promise<void> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Rating_Recipes/${target.Id}`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function unlink_Recipe_Rating_Recipes(source:Models.Recipe, target:Models.Rating) : Promise<void> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Rating_Recipes/${target.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}


export async function get_Recipe_RecommendationPage_Recipes(source:Models.Recipe, page_index:number, page_size:number) : Promise<RawPage<Models.RecommendationPage>> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/RecommendationPage_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
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


export async function get_Recipe_Homepage_Recipes(source:Models.Recipe, page_index:number, page_size:number) : Promise<RawPage<Models.Homepage>> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Homepage_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Homepage>(json, e => { return {...e, }})
}

export async function get_Recipe_Homepage_Recipes_Homepage(source:Models.Recipe, page_index:number, page_size:number, id:number) : Promise<Models.Homepage> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Homepage_Recipes/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Homepage
}

export async function get_Recipe_Homepage_Recipes_Homepage_by_id(source:Models.Recipe, id:number) : Promise<Models.Homepage> {
  let res = await fetch(`/api/v1/Recipe/${source.Id}/Homepage_Recipes/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Homepage
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
           Editable: !!json.Editable }
}

export async function get_Recipes(page_index:number, page_size:number) : Promise<RawPage<Models.Recipe>> {
  let res = await fetch(`/api/v1/Recipe?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
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





  
  
export async function get_Dinner_Dinner_Recipes(source:Models.Dinner, page_index:number, page_size:number) : Promise<RawPage<Models.Recipe>> {
  let res = await fetch(`/api/v1/Dinner/${source.Id}/Dinner_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Recipe>(json, e => { return {...e, }})
}

export async function get_Dinner_Dinner_Recipes_Recipe(source:Models.Dinner, page_index:number, page_size:number, id:number) : Promise<Models.Recipe> {
  let res = await fetch(`/api/v1/Dinner/${source.Id}/Dinner_Recipes/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Recipe
}

export async function get_Dinner_Dinner_Recipes_Recipe_by_id(source:Models.Dinner, id:number) : Promise<Models.Recipe> {
  let res = await fetch(`/api/v1/Dinner/${source.Id}/Dinner_Recipes/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Recipe
}


export async function get_unlinked_Dinner_Dinner_Recipes(source:Models.Dinner, page_index:number, page_size:number) : Promise<RawPage<Models.Recipe>> {
  let res = await fetch(`/api/v1/Dinner/${source.Id}/unlinked/Dinner_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Recipe>(json, e => { return {...e, }})
}

    
export async function create_linked_Dinner_Dinner_Recipes_Recipe(source:Models.Dinner) : Promise<Models.Recipe[]> {
  let res = await fetch(`/api/v1/Dinner/${source.Id}/Dinner_Recipes_Recipe`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return json.map(e => { return {...e, CreatedDate: Moment.utc(e.CreatedDate),  }}) as Models.Recipe[]
}

export async function link_Dinner_Dinner_Recipes(source:Models.Dinner, target:Models.Recipe) : Promise<void> {
  let res = await fetch(`/api/v1/Dinner/${source.Id}/Dinner_Recipes/${target.Id}`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function unlink_Dinner_Dinner_Recipes(source:Models.Dinner, target:Models.Recipe) : Promise<void> {
  let res = await fetch(`/api/v1/Dinner/${source.Id}/Dinner_Recipes/${target.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json'} })
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
           Editable: !!json.Editable }
}

export async function get_Dinners(page_index:number, page_size:number) : Promise<RawPage<Models.Dinner>> {
  let res = await fetch(`/api/v1/Dinner?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Dinner>(json, e => { return {...e, }})
}







  
  
export async function get_Mediterranean_Mediterranean_Recipes(source:Models.Mediterranean, page_index:number, page_size:number) : Promise<RawPage<Models.Recipe>> {
  let res = await fetch(`/api/v1/Mediterranean/${source.Id}/Mediterranean_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Recipe>(json, e => { return {...e, }})
}

export async function get_Mediterranean_Mediterranean_Recipes_Recipe(source:Models.Mediterranean, page_index:number, page_size:number, id:number) : Promise<Models.Recipe> {
  let res = await fetch(`/api/v1/Mediterranean/${source.Id}/Mediterranean_Recipes/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Recipe
}

export async function get_Mediterranean_Mediterranean_Recipes_Recipe_by_id(source:Models.Mediterranean, id:number) : Promise<Models.Recipe> {
  let res = await fetch(`/api/v1/Mediterranean/${source.Id}/Mediterranean_Recipes/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Recipe
}


export async function get_unlinked_Mediterranean_Mediterranean_Recipes(source:Models.Mediterranean, page_index:number, page_size:number) : Promise<RawPage<Models.Recipe>> {
  let res = await fetch(`/api/v1/Mediterranean/${source.Id}/unlinked/Mediterranean_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Recipe>(json, e => { return {...e, }})
}

    
export async function create_linked_Mediterranean_Mediterranean_Recipes_Recipe(source:Models.Mediterranean) : Promise<Models.Recipe[]> {
  let res = await fetch(`/api/v1/Mediterranean/${source.Id}/Mediterranean_Recipes_Recipe`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return json.map(e => { return {...e, CreatedDate: Moment.utc(e.CreatedDate),  }}) as Models.Recipe[]
}

export async function link_Mediterranean_Mediterranean_Recipes(source:Models.Mediterranean, target:Models.Recipe) : Promise<void> {
  let res = await fetch(`/api/v1/Mediterranean/${source.Id}/Mediterranean_Recipes/${target.Id}`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function unlink_Mediterranean_Mediterranean_Recipes(source:Models.Mediterranean, target:Models.Recipe) : Promise<void> {
  let res = await fetch(`/api/v1/Mediterranean/${source.Id}/Mediterranean_Recipes/${target.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
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
           Editable: !!json.Editable }
}

export async function get_Mediterraneans(page_index:number, page_size:number) : Promise<RawPage<Models.Mediterranean>> {
  let res = await fetch(`/api/v1/Mediterranean?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Mediterranean>(json, e => { return {...e, }})
}







  
  
export async function get_Breakfast_Breakfast_Recipes(source:Models.Breakfast, page_index:number, page_size:number) : Promise<RawPage<Models.Recipe>> {
  let res = await fetch(`/api/v1/Breakfast/${source.Id}/Breakfast_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Recipe>(json, e => { return {...e, }})
}

export async function get_Breakfast_Breakfast_Recipes_Recipe(source:Models.Breakfast, page_index:number, page_size:number, id:number) : Promise<Models.Recipe> {
  let res = await fetch(`/api/v1/Breakfast/${source.Id}/Breakfast_Recipes/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Recipe
}

export async function get_Breakfast_Breakfast_Recipes_Recipe_by_id(source:Models.Breakfast, id:number) : Promise<Models.Recipe> {
  let res = await fetch(`/api/v1/Breakfast/${source.Id}/Breakfast_Recipes/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Recipe
}


export async function get_unlinked_Breakfast_Breakfast_Recipes(source:Models.Breakfast, page_index:number, page_size:number) : Promise<RawPage<Models.Recipe>> {
  let res = await fetch(`/api/v1/Breakfast/${source.Id}/unlinked/Breakfast_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Recipe>(json, e => { return {...e, }})
}

    
export async function create_linked_Breakfast_Breakfast_Recipes_Recipe(source:Models.Breakfast) : Promise<Models.Recipe[]> {
  let res = await fetch(`/api/v1/Breakfast/${source.Id}/Breakfast_Recipes_Recipe`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return json.map(e => { return {...e, CreatedDate: Moment.utc(e.CreatedDate),  }}) as Models.Recipe[]
}

export async function link_Breakfast_Breakfast_Recipes(source:Models.Breakfast, target:Models.Recipe) : Promise<void> {
  let res = await fetch(`/api/v1/Breakfast/${source.Id}/Breakfast_Recipes/${target.Id}`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function unlink_Breakfast_Breakfast_Recipes(source:Models.Breakfast, target:Models.Recipe) : Promise<void> {
  let res = await fetch(`/api/v1/Breakfast/${source.Id}/Breakfast_Recipes/${target.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
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
           Editable: !!json.Editable }
}

export async function get_Breakfasts(page_index:number, page_size:number) : Promise<RawPage<Models.Breakfast>> {
  let res = await fetch(`/api/v1/Breakfast?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Breakfast>(json, e => { return {...e, }})
}







  
  
export async function get_Favorite_User_Favorites(source:Models.Favorite, page_index:number, page_size:number) : Promise<RawPage<Models.User>> {
  let res = await fetch(`/api/v1/Favorite/${source.Id}/User_Favorites?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.User>(json, e => { return {...e, }})
}

export async function get_Favorite_User_Favorites_User(source:Models.Favorite, page_index:number, page_size:number, id:number) : Promise<Models.User> {
  let res = await fetch(`/api/v1/Favorite/${source.Id}/User_Favorites/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.User
}

export async function get_Favorite_User_Favorites_User_by_id(source:Models.Favorite, id:number) : Promise<Models.User> {
  let res = await fetch(`/api/v1/Favorite/${source.Id}/User_Favorites/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.User
}


export async function get_unlinked_Favorite_User_Favorites(source:Models.Favorite, page_index:number, page_size:number) : Promise<RawPage<Models.User>> {
  let res = await fetch(`/api/v1/Favorite/${source.Id}/unlinked/User_Favorites?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.User>(json, e => { return {...e, }})
}

    
export async function create_linked_Favorite_User_Favorites_User(source:Models.Favorite) : Promise<Models.User[]> {
  let res = await fetch(`/api/v1/Favorite/${source.Id}/User_Favorites_User`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return json.map(e => { return {...e, CreatedDate: Moment.utc(e.CreatedDate),  }}) as Models.User[]
}

export async function link_Favorite_User_Favorites(source:Models.Favorite, target:Models.User) : Promise<void> {
  let res = await fetch(`/api/v1/Favorite/${source.Id}/User_Favorites/${target.Id}`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function unlink_Favorite_User_Favorites(source:Models.Favorite, target:Models.User) : Promise<void> {
  let res = await fetch(`/api/v1/Favorite/${source.Id}/User_Favorites/${target.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}


export async function get_Favorite_Favorite_Recipes(source:Models.Favorite, page_index:number, page_size:number) : Promise<RawPage<Models.Recipe>> {
  let res = await fetch(`/api/v1/Favorite/${source.Id}/Favorite_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Recipe>(json, e => { return {...e, }})
}

export async function get_Favorite_Favorite_Recipes_Recipe(source:Models.Favorite, page_index:number, page_size:number, id:number) : Promise<Models.Recipe> {
  let res = await fetch(`/api/v1/Favorite/${source.Id}/Favorite_Recipes/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Recipe
}

export async function get_Favorite_Favorite_Recipes_Recipe_by_id(source:Models.Favorite, id:number) : Promise<Models.Recipe> {
  let res = await fetch(`/api/v1/Favorite/${source.Id}/Favorite_Recipes/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Recipe
}


export async function get_unlinked_Favorite_Favorite_Recipes(source:Models.Favorite, page_index:number, page_size:number) : Promise<RawPage<Models.Recipe>> {
  let res = await fetch(`/api/v1/Favorite/${source.Id}/unlinked/Favorite_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Recipe>(json, e => { return {...e, }})
}

    
export async function create_linked_Favorite_Favorite_Recipes_Recipe(source:Models.Favorite) : Promise<Models.Recipe[]> {
  let res = await fetch(`/api/v1/Favorite/${source.Id}/Favorite_Recipes_Recipe`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return json.map(e => { return {...e, CreatedDate: Moment.utc(e.CreatedDate),  }}) as Models.Recipe[]
}

export async function link_Favorite_Favorite_Recipes(source:Models.Favorite, target:Models.Recipe) : Promise<void> {
  let res = await fetch(`/api/v1/Favorite/${source.Id}/Favorite_Recipes/${target.Id}`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function unlink_Favorite_Favorite_Recipes(source:Models.Favorite, target:Models.Recipe) : Promise<void> {
  let res = await fetch(`/api/v1/Favorite/${source.Id}/Favorite_Recipes/${target.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}


export async function create_Favorite() : Promise<Models.Favorite> {
  let res = await fetch(`/api/v1/Favorite/`,
    { method: 'post', credentials: 'include', headers:{'content-type': 'application/json',
      'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Favorite
}

export async function update_Favorite(item:Models.Favorite) : Promise<void> {
  let res = await fetch(`/api/v1/Favorite/`, { method: 'put',
      body: JSON.stringify({...item, CreatedDate:undefined, }), credentials: 'include', headers:{'content-type': 'application/json', 'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function delete_Favorite(source:Models.Favorite) : Promise<void> {
  let res = await fetch(`/api/v1/Favorite/${source.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json', 'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function get_Favorite(id:number) : Promise<ItemWithEditable<Models.Favorite>> {
  let res = await fetch(`/api/v1/Favorite/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return { Item: {...json.Item, CreatedDate: Moment.utc(json.Item.CreatedDate),  } as Models.Favorite,
           Editable: !!json.Editable }
}

export async function get_Favorites(page_index:number, page_size:number) : Promise<RawPage<Models.Favorite>> {
  let res = await fetch(`/api/v1/Favorite?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Favorite>(json, e => { return {...e, }})
}







  
  
export async function create_fifteen() : Promise<Models.fifteen> {
  let res = await fetch(`/api/v1/fifteen/`,
    { method: 'post', credentials: 'include', headers:{'content-type': 'application/json',
      'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.fifteen
}

export async function update_fifteen(item:Models.fifteen) : Promise<void> {
  let res = await fetch(`/api/v1/fifteen/`, { method: 'put',
      body: JSON.stringify({...item, CreatedDate:undefined, }), credentials: 'include', headers:{'content-type': 'application/json', 'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function delete_fifteen(source:Models.fifteen) : Promise<void> {
  let res = await fetch(`/api/v1/fifteen/${source.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json', 'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function get_fifteen(id:number) : Promise<ItemWithEditable<Models.fifteen>> {
  let res = await fetch(`/api/v1/fifteen/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return { Item: {...json.Item, CreatedDate: Moment.utc(json.Item.CreatedDate),  } as Models.fifteen,
           Editable: !!json.Editable }
}

export async function get_fifteens(page_index:number, page_size:number) : Promise<RawPage<Models.fifteen>> {
  let res = await fetch(`/api/v1/fifteen?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.fifteen>(json, e => { return {...e, }})
}







  
  
export async function get_Rating_User_Ratings(source:Models.Rating, page_index:number, page_size:number) : Promise<RawPage<Models.User>> {
  let res = await fetch(`/api/v1/Rating/${source.Id}/User_Ratings?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.User>(json, e => { return {...e, }})
}

export async function get_Rating_User_Ratings_User(source:Models.Rating, page_index:number, page_size:number, id:number) : Promise<Models.User> {
  let res = await fetch(`/api/v1/Rating/${source.Id}/User_Ratings/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.User
}

export async function get_Rating_User_Ratings_User_by_id(source:Models.Rating, id:number) : Promise<Models.User> {
  let res = await fetch(`/api/v1/Rating/${source.Id}/User_Ratings/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.User
}


export async function get_unlinked_Rating_User_Ratings(source:Models.Rating, page_index:number, page_size:number) : Promise<RawPage<Models.User>> {
  let res = await fetch(`/api/v1/Rating/${source.Id}/unlinked/User_Ratings?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.User>(json, e => { return {...e, }})
}

    
export async function create_linked_Rating_User_Ratings_User(source:Models.Rating) : Promise<Models.User[]> {
  let res = await fetch(`/api/v1/Rating/${source.Id}/User_Ratings_User`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return json.map(e => { return {...e, CreatedDate: Moment.utc(e.CreatedDate),  }}) as Models.User[]
}

export async function link_Rating_User_Ratings(source:Models.Rating, target:Models.User) : Promise<void> {
  let res = await fetch(`/api/v1/Rating/${source.Id}/User_Ratings/${target.Id}`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function unlink_Rating_User_Ratings(source:Models.Rating, target:Models.User) : Promise<void> {
  let res = await fetch(`/api/v1/Rating/${source.Id}/User_Ratings/${target.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}


export async function get_Rating_Rating_Recipes(source:Models.Rating, page_index:number, page_size:number) : Promise<RawPage<Models.Recipe>> {
  let res = await fetch(`/api/v1/Rating/${source.Id}/Rating_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Recipe>(json, e => { return {...e, }})
}

export async function get_Rating_Rating_Recipes_Recipe(source:Models.Rating, page_index:number, page_size:number, id:number) : Promise<Models.Recipe> {
  let res = await fetch(`/api/v1/Rating/${source.Id}/Rating_Recipes/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Recipe
}

export async function get_Rating_Rating_Recipes_Recipe_by_id(source:Models.Rating, id:number) : Promise<Models.Recipe> {
  let res = await fetch(`/api/v1/Rating/${source.Id}/Rating_Recipes/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Recipe
}


export async function get_unlinked_Rating_Rating_Recipes(source:Models.Rating, page_index:number, page_size:number) : Promise<RawPage<Models.Recipe>> {
  let res = await fetch(`/api/v1/Rating/${source.Id}/unlinked/Rating_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Recipe>(json, e => { return {...e, }})
}

    
export async function create_linked_Rating_Rating_Recipes_Recipe(source:Models.Rating) : Promise<Models.Recipe[]> {
  let res = await fetch(`/api/v1/Rating/${source.Id}/Rating_Recipes_Recipe`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return json.map(e => { return {...e, CreatedDate: Moment.utc(e.CreatedDate),  }}) as Models.Recipe[]
}

export async function link_Rating_Rating_Recipes(source:Models.Rating, target:Models.Recipe) : Promise<void> {
  let res = await fetch(`/api/v1/Rating/${source.Id}/Rating_Recipes/${target.Id}`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function unlink_Rating_Rating_Recipes(source:Models.Rating, target:Models.Recipe) : Promise<void> {
  let res = await fetch(`/api/v1/Rating/${source.Id}/Rating_Recipes/${target.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json'} })
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
           Editable: !!json.Editable }
}

export async function get_Ratings(page_index:number, page_size:number) : Promise<RawPage<Models.Rating>> {
  let res = await fetch(`/api/v1/Rating?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Rating>(json, e => { return {...e, }})
}







  
  
export async function get_Grill_Grill_Recipes(source:Models.Grill, page_index:number, page_size:number) : Promise<RawPage<Models.Recipe>> {
  let res = await fetch(`/api/v1/Grill/${source.Id}/Grill_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Recipe>(json, e => { return {...e, }})
}

export async function get_Grill_Grill_Recipes_Recipe(source:Models.Grill, page_index:number, page_size:number, id:number) : Promise<Models.Recipe> {
  let res = await fetch(`/api/v1/Grill/${source.Id}/Grill_Recipes/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Recipe
}

export async function get_Grill_Grill_Recipes_Recipe_by_id(source:Models.Grill, id:number) : Promise<Models.Recipe> {
  let res = await fetch(`/api/v1/Grill/${source.Id}/Grill_Recipes/${id}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.Recipe
}


export async function get_unlinked_Grill_Grill_Recipes(source:Models.Grill, page_index:number, page_size:number) : Promise<RawPage<Models.Recipe>> {
  let res = await fetch(`/api/v1/Grill/${source.Id}/unlinked/Grill_Recipes?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Recipe>(json, e => { return {...e, }})
}

    
export async function create_linked_Grill_Grill_Recipes_Recipe(source:Models.Grill) : Promise<Models.Recipe[]> {
  let res = await fetch(`/api/v1/Grill/${source.Id}/Grill_Recipes_Recipe`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return json.map(e => { return {...e, CreatedDate: Moment.utc(e.CreatedDate),  }}) as Models.Recipe[]
}

export async function link_Grill_Grill_Recipes(source:Models.Grill, target:Models.Recipe) : Promise<void> {
  let res = await fetch(`/api/v1/Grill/${source.Id}/Grill_Recipes/${target.Id}`, { method: 'post', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}

export async function unlink_Grill_Grill_Recipes(source:Models.Grill, target:Models.Recipe) : Promise<void> {
  let res = await fetch(`/api/v1/Grill/${source.Id}/Grill_Recipes/${target.Id}`, { method: 'delete', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
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
           Editable: !!json.Editable }
}

export async function get_Grills(page_index:number, page_size:number) : Promise<RawPage<Models.Grill>> {
  let res = await fetch(`/api/v1/Grill?page_index=${page_index}&page_size=${page_size}`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return make_page<Models.Grill>(json, e => { return {...e, }})
}







  
  
  