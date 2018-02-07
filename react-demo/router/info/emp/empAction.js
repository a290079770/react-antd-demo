export const GET_EMP_BY_PAGE = 'GET_EMP_BY_PAGE';


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
			}).then((data)=>dispatch(getEmpByPage(data)));
	}
}

