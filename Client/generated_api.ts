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







  
  
export async function create_PreparationTime() : Promise<Models.PreparationTime> {
  let res = await fetch(`/api/v1/PreparationTime/`,
    { method: 'post', credentials: 'include', headers:{'content-type': 'application/json',
      'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
  let json = await res.json()
  return {...json, CreatedDate: Moment.utc(json.CreatedDate),  } as Models.PreparationTime
}

export async function update_PreparationTime(item:Models.PreparationTime) : Promise<void> {
  let res = await fetch(`/api/v1/PreparationTime/`, { method: 'put',
      body: JSON.stringify({...item, CreatedDate:undefined, }), credentials: 'include', headers:{'content-type': 'application/json', 'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
  if (!res.ok) throw Error(res.statusText)
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
      body: JSON.stringify({...item, CreatedDate:undefined, }), credentials: 'include', headers:{'content-type': 'application/json', 'X-XSRF-TOKEN': (document.getElementsByName("__RequestVerificationToken")[0] as any).value } })
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







  
  
  