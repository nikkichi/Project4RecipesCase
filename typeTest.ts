function greeter (person){
    return "hello %s %*s this is %s and %s, 12, foo, bar " + person;

}
var user = "  %s Nikki";
console.log( greeter ( user) );