export const GET_EMP_BY_PAGE = 'GET_EMP_BY_PAGE';
export const SHOW_ADDP = 'SHOW_ADDP';

export function getEmpByPage(page){
	return {
		type:GET_EMP_BY_PAGE,
		page
	}
}

export function asyncGetEmp({eachPage = 10,curPage = 1}={}){
	return dispatch => {
		fetch("/emp/getEmpByPage", {
			    method: "POST",
			    headers: {
			        "Content-Type": "application/x-www-form-urlencoded"
			    },
			    body: `eachPage=${eachPage}&curPage=${curPage}`,
				credentials: 'include'
			}).then(function(response) {
			    return response.json();
			}).then((data)=>{
				data = Object.assign({},data,{curPage:parseInt(data.curPage),eachPage:parseInt(data.eachPage)})

				dispatch(getEmpByPage(data))
			});
	}
}


export function firstPage(page) {
     return dispatch=>{
     	dispatch(asyncGetEmp(page))
     }
}

export function lastPage(page) {
	return dispatch=>{
     	dispatch(asyncGetEmp(page))
     }	
}

export function prevPage(page) {
	return dispatch=>{
		if(page.curPage > 1){
		dispatch(asyncGetEmp({curPage:--page.curPage,eachPage:page.eachPage}))
	   }
	}
}

export function nextPage(page) {
	return dispatch=>{
		if(page.curPage < page.maxPage){
		dispatch(asyncGetEmp({curPage:++page.curPage,eachPage:page.eachPage}))
	   }
	}
}

//上面是多个按钮操作
//
//


// 下面是删除按钮
// 

export function del(empName,curPage){
   return dispatch=>{
		fetch("/emp/del", {
			    method: "POST",
			    headers: {
			        "Content-Type": "application/x-www-form-urlencoded"
			    },
			    body: `empName=${empName}`,
				credentials: 'include'
			}).then(function(response) {
			    return response.json();
			}).then((data)=>{
				dispatch(asyncGetEmp({curPage}))
			});
	}
} 


// 下面的增加功能
// 

export function showAddp(flag){
	if(flag=='hide'){
       return{
		type:SHOW_ADDP,
		flagLast:false
	  }
	}else{
		return{
		type:SHOW_ADDP,
		flagLast:true
	  } 
	}
	
}

export function cancle(empName,empSal,empJob){
     return dispatch=>{
     	empName.value = ''
     	empSal.value = ''
     	empJob.value = ''
     	dispatch(showAddp("show"))   //隐藏添加栏
     }
}
//放弃按钮，清空输入框并隐藏


export function addEmp1(empName,empSal,empJob) {

	return dispatch=>{
		fetch("/emp/addObj", {
			    method: "POST",
			    headers: {
			        "Content-Type": "application/x-www-form-urlencoded"
			    },
			    body: `empName=${empName}&empSal=${empSal}&empJob=${empJob}`,
				credentials: 'include'
			}).then(function(response) {
			    return response.json();
			}).then((data)=>{
				dispatch(asyncGetEmp())    //重新渲染
			});
	}
}
//确认添加