import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel: function(){
		return this.get('session').fetch().catch(function(){
		});
	},

	actions: {
		signIn: function(provider){
			this.get('session').open('firebase', {
				provider: provider
			}).then(function(data){
				this.transitionTo('posts');
				console.log(data.currentUser);
			}.bind(this));
		},
		formLogin: function(){
			var controller = this.get('controller');
			var email = controller.get('userEmail');
			var password = controller.get('userPassword');

			this.get('session').open('firebase', {
				provider: 'password',
				email: email,
				password: password
			}).then(function(data){
				console.log(data);
				this.transitionTo(('posts'));
			}.bind(this));
		},
		signOut: function(){
			this.get('session').close();
		}
	}
});
