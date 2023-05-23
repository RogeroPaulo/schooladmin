const dateFormatter = {
	
	init:function(dateStr){
		let date=new Date(dateStr);
		let yr=date.getFullYear();
		let mth=dateFormatter.getMonthName(date.getMonth());
		let day=date.getDate();
		let time=date.toLocaleTimeString('en-SG', {
			timeZone: 'Asia/Singapore',
			hour: '2-digit',
			minute:'2-digit'
		});
		let obj={
			date:date,
			yr:yr,
			mth:mth,
			day:day,
			time:time
		};
		return obj;
	},

	getMonthName:function(i){
		let arr=["January", "February", "March", "April", "May", "June","July", "August", "September", "October","November", "December"];
		return arr[i];
	},

	getDayName:function(i){
		let arr=[ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		return arr[i];
	}
	
};

module.exports = dateFormatter;
