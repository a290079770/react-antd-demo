import React from 'react';
import { Table, Button,message } from 'antd';
import BookAddForm from './book-addForm';
import axios from '../../config.js';

export default class Book extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
    dataList:[],
    ps:10,
    cp:1,
    keyword:'',
    isAddModalShow:false,
    columns:[{
      title: '书名',
      dataIndex: 'title',
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
      render:text=>{
        return (
           <span>
              <Button type="primary" size='small' icon="edit" style={{marginRight:'5px'}}>修改</Button>
              <Button type="danger" icon="delete" size='small'>删除</Button>
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
    for (let i = 0; i < 46; i++) {
      this.state.dataList.push({
        key: i,
        title: `Edward King ${i}`,
        author: 32,
        publisher: `London, Park Lane no. ${i}`,
        publishDate: `London, Park Lane no. ${i}`,
      });
    }
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
        console.log(res.data)
        if(res.data.Success) {
           
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
  onPaginationChange(page, pageSize) {
    
  }

  //关闭模态框
  toggleModal(visible) {
    this.setState({ 
      isAddModalShow:visible
    });
  }


  render() {
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    const pagination = {
       onChange:this.onPaginationChange
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
        </div>
        <Table pagination={pagination} rowSelection={rowSelection} columns={this.state.columns} dataSource={ this.state.dataList} />

        <BookAddForm isAddModalShow={this.state.isAddModalShow} hideModal={()=>this.toggleModal(false)}/>

      </div>
    );
  }
}


