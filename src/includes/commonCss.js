export const commonCss = `
body{
	margin:85px 0 0;
	padding:0;
	font-family:
		Georgia,"Times New Roman","Microsoft YaHei New", 
		"Microsoft Yahei","微软雅黑",宋体,SimSun,STXihei,
		"华文细黑",sans-serif;
	line-height:28px;
	font-size:16px;
	background:#FAFAFA;
	color:#4a4a4a;
}
p{
	margin:0 0 10px;
}
h3{
	padding:0;
	margin:0 0 10px;
	color:#000;
	font-size:18px;
	font-weight:800;
}
a{
	text-decoration:none;
	color:inherit;
}
a:hover{
	color:#f60;
}
ul{
	margin:0;
	padding:0;
}
`.replace(/\n|\t/g,'');//Remove tabs and linebreaks.