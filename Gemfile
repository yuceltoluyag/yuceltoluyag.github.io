source "https://rubygems.org"


gemspec



group :jekyll_plugins do
  gem 'jekyll-feed', "~> 0.16"
  gem 'jekyll-paginate'
  gem 'jekyll-assets'
  gem 'jekyll-seo-tag'
  gem 'jekyll-pwa-workbox'
  gem 'jekyll-sitemap'
  gem 'jekyll-archives'
  gem 'kramdown'
  gem 'rouge'
  gem 'logger'
  gem 'csv'
  gem 'ostruct'
  gem 'base64'

end


# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
install_if -> { RUBY_PLATFORM =~ %r!mingw|mswin|java! } do
  gem "tzinfo", "~> 2.0"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.2.0", :install_if => Gem.win_platform?
gem "webrick", "~> 1.7"
