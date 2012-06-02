#gems
require 'sinatra'

#modules
require './lib/module'

#config
class App
  def self.name
    "Sinatra Heroku Boostrap"
  end
end

#GET root
get '/' do
  @title = App.name + ' | Home'
  @body_id = 'home'
  @body_class = 'page'

  erb :index, :layout => :'layout'
end
