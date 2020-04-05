/* eslint-disable */
function updataFile(el, nowvue, fn) {
    var this_file = nowvue.$refs[el];
    var inpFiles = this_file.files;
    var files = inpFiles[0].name;
    if (window.FileReader) {
        var reader = new FileReader();
        for (let i = 0; i < inpFiles.length; i++) {

        }
        let files_index = 0;
        let obj = {
            jbxx_id: nowvue.$route.query.jbxx_id
        };
        obj[el] = [];
        obj[el + "_name"] = [];
        files_fn(files_index)
        function files_fn(files_index) {
            if (files_index == inpFiles.length) {
                ajax();
                return
            }
            reader.readAsDataURL(inpFiles[files_index]);
            reader.onloadend = e => {
                obj[el].push(e.target.result);
                obj[el + "_name"].push(inpFiles[files_index].name);
                files_index += 1;
                files_fn(files_index)
            }
        }
        //监听文件读取结束后事件
        function ajax() {
            nowvue.axios.post("/index/company/pro_save", obj, data => {
                if (data.status == "success") {
                    nowvue.$message({
                        showClose: true,
                        message: "上传成功",
                        type: "success"
                    });
                    fn()
                } else {
                    nowvue.$message({
                        showClose: true,
                        message: "上传失败",
                        type: "error"
                    });
                }
            });
        }
    }
}
export default {
    updataFile
}