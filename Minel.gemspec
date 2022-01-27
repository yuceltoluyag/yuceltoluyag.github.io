# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "Minel"
  spec.version       = "0.1.0"
  spec.authors       = ["yuceltoluyag"]
  spec.email         = ["ytoluyag@gmail.com"]

  spec.summary       = "Simple,Faster,Modern Blog"
  spec.homepage      = "https://yuceltoluyag.github.io/"
  spec.license       = "MIT"
  spec.metadata = {
    "bug_tracker_uri"   => "https://github.com/yuceltoluyag/yuceltoluyag.github.io/issues",
    "documentation_uri" => "https://github.com/yuceltoluyag/yuceltoluyag.github.io/blob/main/README.md",
    "homepage_uri"      => "https://yuceltoluyag.github.io/",
    "source_code_uri"   => "https://github.com/yuceltoluyag/yuceltoluyag.github.io/",
    "wiki_uri"          => "https://github.com/yuceltoluyag/yuceltoluyag.github.io/wiki",
    "plugin_type"       => "theme"
  }

  # spec.required_ruby_version = ">= 3.0"
  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_layouts|_includes|_sass|LICENSE|README|_config\.yml)!i) }
  spec.platform      = Gem::Platform::RUBY
  spec.add_runtime_dependency "jekyll", "~> 4.2"
  spec.add_development_dependency "bundler", "~> 2.2.29"
  spec.add_development_dependency "rake", "~> 13.0.6"
end
