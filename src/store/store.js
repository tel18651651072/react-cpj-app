/**
 * Created by mac on 2018/1/10.
 */

import { observable, action,runInAction } from "mobx";

 class SuccessState {
       @observable loginSuccess = 0;
       @observable registerSuccess = 0;
       @observable loginSubmitTip = '';
       @observable modalClass ='';
       @observable editorSuccess =0;
       @observable searchData = '';
       @observable searchSuccess =0;
       @observable getReplyListSuccess = 0;
       @observable email = '';
       @observable exitStatus = true;
       @observable ifFollow = 0;
       @observable reviseStatus = 0;   // 在线编辑状态
       @observable reviseArticle = [];
       @observable issueStatus = 0;   // 发布状态
       @action changeLoginState() {
           this.loginSuccess = 1
           this.loginSubmitTip = '登录成功'
       }
       @action changeRegisterState() {
           this.registerSuccess = 1
       }
       @action changeModalClas(value) {
           this.modalClass = value
       }
       @action changeEditorState() {
           this.editorSuccess = 1
       }
       @action searchDataState(searchData) {
           this.searchData = searchData;
           this.searchSuccess =1
       }
       @action getEmail(email) {
           this.email = email
       }
       @action reviseStoreFn() {
           this.reviseStatus = 1
           console.log('reviseStatus')
           console.log(this.reviseStatus)
       }
       @action issueStoreFn(action) {
           this.issueStatus = action
       }
       @action reviseArticleFn(Article) {
           console.log(Article)
           this.reviseArticle = Article
       }
 }
export default new SuccessState()