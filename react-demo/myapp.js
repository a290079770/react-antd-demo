import { createStore,applyMiddleware,combineReducers} from 'redux';

import $ from 'jquery';
import './index.css';
import {
  addTodo,
  setComplated,
  setShowType,
  setId
} from './redux/action.js'
//action
import {fn} from './redux/reducer.js'
//reducer

var store = createStore(fn)
store.subscribe(()=>{
  console.log(store.getState())
})


// store.dispatch(addTodo('hello',2))
// store.dispatch(setComplated(2))
// console.log(store.dispatch(addTodo('hello',2)))

// store.dispatch(setShowType('complated'))
// store.dispatch(setShowType('active'))
// store.dispatch(setShowType('all'))

// store.dispatch(setId())
// store.dispatch(setId())

// console.log(store.getState())

//  





var data = store.getState();

    $('#ulContent').on('click','li',function(){
      var index = $(this).index()
      for(var i = 0;i<data.todolist.length;i++){
            if(data.todolist[i].id==index){
              if(data.todolist[i].completed == false){
                data.todolist[i].completed = true
              }else{
                data.todolist[i].completed = false
              }
            }
      }
      render(data)
    }).on('click','a',function(e){
      e.preventDefault();
      data.showType = $(this).text();
      render(data)
    }) 

    $('#addBtn').on('click',function(){
         data.todolist.push({
          id:data.index,
          text:$('input').val(),
          completed:false
         })
         $('input').val('')
         data.index++
         render(data)
    }) 

     function showType(data){
        switch(data.showType){
          case 'all':return data.todolist;
          case 'completed':
                return data.todolist.filter(function(item){
                   return item.completed
                });
          case 'active':return data.todolist.filter(function(item){
                   return !item.completed
                });
        }
     }
    

     render(data)  
   function render(data){
        var str = '<ul>'
        showType(data).map(function(item){
         return str += '<li class="'+(item.completed?"selected":"")+'">'+item.text+'</li>'  
        }).join('');
        str += '</ul>';
        str+='SHOW:'+ filter('all',data.showType)+filter('completed',data.showType)+filter('active',data.showType)

        $('#ulContent').html(str)
   }
 
    
   function filter(name,showType){
       if(name == showType){
         return '<span>'+name+'</span>&nbsp'
       }else{
         return '<a href="#">'+name+'</a>&nbsp'
       }
   }