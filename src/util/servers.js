const httpProtocol = 'http://';
const servers = {
  //FaceScan: httpProtocol + '10.129.148.81:9000', //徐强
  //FaceScan: httpProtocol + '10.129.148.81:8585',
  FaceScan: httpProtocol + '10.142.82.212:9191',
  BizTask: httpProtocol + 'api.task.bizwork.sogou',
  BizTaskDev: httpProtocol + '10.142.72.148:9001',
  BizWork: httpProtocol + 'api.bizwork.sogou'
};
export default servers;