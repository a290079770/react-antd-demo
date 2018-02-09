import React from 'react';
import { Table, Button,message,Input,Modal } from 'antd';
import BookAddForm from './book-addForm';
import BookUpdateForm from './book-updateForm';
import axios from '../../config.js';
const Search = Input.Search;
const confirm = Modal.confirm

export default class Book extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
    dataList:[],
    ps:10,
    cp:1,
    total:0,
    keyword:'',
    isAddModalShow:false,
    updateData:null,
    columns:[{
      title: '书名',
      dataIndex: 'title',
      width:200,

    }, {
      title: '作者',
      dataIndex: 'author',
    }, {
      title: '出版社',
      dataIndex: 'publisher',
    }, {
      title: '出版时间',
      dataIndex: 'publishDate',
    },{
      title: '操作',
      align:'center',
      render:text=>{
        return (
           <span>
              <Button type="primary" size='small' icon="edit" style={{marginRight:'5px'}} onClick={()=>this.update(text)}>修改</Button>
              <Button type="danger" icon="delete" size='small' onClick={()=>this.delete(text)}>删除</Button>
           </span>
          ) 
        }
      }
    ]
  };
  
  /**
   * [componentWillMount 一进入组件请求数据]
   * @Author   罗文
   * @DateTime 2018-02-08
   * @return   {[type]}   [description]
   */
  componentWillMount() {
    this.getTableList();
  }
  
  /**
   * [getTableList 请求数据]
   * @Author   罗文
   * @DateTime 2018-02-08
   * @return   {[type]}   [description]
   */
  getTableList() {
     axios.get('/book/list',{
       params:{
          ps:this.state.ps,
          cp:this.state.cp,
          keyword:this.state.keyword,
       }
     }).then(res=>{
        if(res.data.Success) {
           res.data.Data.itemList = res.data.Data.itemList.map((item)=>{
              return Object.assign({
                 key:item._id
              },item)
           })

           this.setState({
             dataList:res.data.Data.itemList,
             total:res.data.Data.totalRecord
           })
        }else {
           message.error(res.data.Description);
        }
     })
  }

  //单选多选
  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }
  
  //分页
  onPaginationChange = (page, pageSize) => {
     this.setState({
        ps:pageSize,
        cp:page,
     },()=>{
        this.getTableList();
     })
  }

  //设置搜索列表
  searchList(keyword) {
     this.setState({
        keyword:keyword,
        ps:10,
        cp:1
     },()=>{
        this.getTableList();
     })
  }

  //删除操作
  delete(item) {
     let _this = this;
     confirm({
      title: '警告',
      content: '确定删除这本书？',
      okText:'确定',
      style:{top:250},
      cancelText:'取消',
      onOk() {
       axios.post('/book/delete',{
         id:item._id,
       }).then(res=>{
          if(res.data.Success) {
             message.success('删除成功！');
             _this.getTableList();
          }else {
             message.error(res.data.Description);
          }
       })
     }  
    }) 
  }


  //删除操作
  update(item) {
     this.state.updateData = item;
     this.toggleModal(true,false,'isUpdateModalShow');
  }

  //关闭模态框
  toggleModal(visible,needReload,modalName='isAddModalShow') {
    let obj = {};
    if(modalName == 'isAddModalShow') {
      obj = {isAddModalShow:visible}
    }else if(modalName == 'isUpdateModalShow'){
      obj = {isUpdateModalShow:visible}
    }

    this.setState(obj);

    if(needReload) {
      this.getTableList();
    }
  }


  render() {
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    const pagination = {
       onChange:this.onPaginationChange,
       current:this.state.cp,
       defaultCurrent:1,
       defaultPageSize:10,
       pageSize:this.state.ps,
       total:this.state.total
    }
    return (
      <div>
        <div style={{ paddingBottom: 16,borderBottom:'1px solid #eee' }}>
          <Button
            type="primary"
            icon="plus"
            onClick={()=>this.toggleModal(true)}
          >
            新增
          </Button>

          <Search
            placeholder="请输入图书名和作者关键字进行查询"
            onSearch={value => this.searchList(value)}
            style={{ width: 200,float:'right' }}
          />
        </div>
        <Table pagination={pagination} rowSelection={rowSelection} columns={this.state.columns} dataSource={ this.state.dataList} />

        <BookAddForm 
          isAddModalShow={this.state.isAddModalShow} 
          hideModal={(needReload)=>this.toggleModal(false,needReload)}/>

        <BookUpdateForm 
          updateData={this.state.updateData}
          isUpdateModalShow={this.state.isUpdateModalShow} 
          hideModal={(needReload)=>this.toggleModal(false,needReload,'isUpdateModalShow')}/>  

      </div>
    );
  }
}


