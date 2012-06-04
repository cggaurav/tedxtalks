require 'sinatra'

get '/' do
	erb :index
end

get '/youtube' do
	erb :youtube
end