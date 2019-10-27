import React from 'react';
import ReactDOM from 'react-dom';
import withStyles from 'isomorphic-style-loader/withStyles';
import gs from 'src/global.css';
import s from './sidebar.css';

class Sidebar extends React.Component {
	render() {
		return (
			<div className={s.sidebar}>
				<div className={s.register}>
					<p>
						要发表你的个人资料吗?<br />
						请扫一扫下面的二维码
					</p>
					<img className={s.qrcode} src="https://www.369usa.com/images/qrcode-old.png" />
					<p>
						微信号: wechat123456
					</p>
				</div>
			</div>
		)
	}
}

export default withStyles(s,gs)(Sidebar);