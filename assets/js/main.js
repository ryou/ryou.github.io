;(function() {
  var PagerComponent = {
    props: ['current', 'total'],
    template: '#pager-component-template',
    computed: {
      prevIsExist: function() {
        return (this.current > 0);
      },
      nextIsExist: function() {
        return (this.current+2 < this.total);
      },
      prevUrl: function() {
        return '/page/' + (this.current - 1);
      },
      nextUrl: function() {
        return '/page/' + (this.current + 1);
      }
    },
    methods: {
      showPrev: function() {
        this.$emit('prev');
      },
      showNext: function() {
        this.$emit('next');
      }
    }
  };
  var IndexComponent = {
    data: function() {
      return {
        currentPage: 0,
        count: 10
      };
    },
    props: ['articles'],
    template: '#index-component-template',
    computed: {
      dispArticles: function() {
        return this.articles.slice(this.count*this.currentPage, this.count*(this.currentPage+1));
      },
      totalPage: function() {
        return (this.articles.length / this.count) + 1;
      }
    },
    methods: {
      prevPage: function() {
        this.currentPage--;
      },
      nextPage: function() {
        this.currentPage++;
      }
    },
    watch: {
      '$route': function(to, from) {
        if (typeof to.params.index === 'undefined') {
          this.currentPage = 0;
        } else {
          this.currentPage = parseInt(to.params.index);
        }
      }
    },
    components: {
      'link-component': {
        props: ['article'],
        template: '#link-component-template',
        computed: {
          url: function() {
            return '/posts/';
          },
          date: function() {
            var date = new Date(
              this.article.date.slice(0, 4),
              this.article.date.slice(4, 6)-1,
              this.article.date.slice(6, 8)
            );
            return date;
          }
        }
      },
      'pager-component': PagerComponent
    },
    mounted: function() {
      document.title = 'index';
      if (typeof this.$route.params.index === 'undefined') {
        this.currentPage = 0;
      } else {
        this.currentPage = parseInt(this.$route.params.index);
      }
    }
  };
  var PostsComponent = {
    data: function() {
      return {
        content: ''
      };
    },
    template: '#posts-component-template',
    computed: {
      date: function() {
        return (this.$route.params.perma_link.split('__'))[0];
      },
      title: function() {
        return (this.$route.params.perma_link.split('__'))[1];
      },
      dateObj: function() {
        var date = new Date(
          this.date.slice(0, 4),
          this.date.slice(4, 6)-1,
          this.date.slice(6, 8)
        );
        return date;
      }
    },
    mounted: function() {
      document.title = this.title;

      var self = this;
      $.ajax({
        type: 'GET',
        url: '/posts/' + this.$route.params.perma_link + '/README.md',
      })
      .then(
        function(res) {
          self.content = marked(res);
        },
        function() {
          console.log('error');
        }
      );
    }
  };
  var NotFoundComponent = {
    template: '<div>not found.</div>',
    mounted: function() {
      document.title = 'not found';
    }
  };

  var app = new Vue({
    data: {
      articles: []
    },
    el: '#app',
    router: new VueRouter({
      // mode: 'history',
      routes: [
        { path: '/', component: IndexComponent },
        { path: '/page/:index/', component: IndexComponent },
        { path: '/posts/:perma_link/', component: PostsComponent },
        { path: '*', component: NotFoundComponent }
      ]
    }),
    created: function() {
      var self = this;
      $.ajax({
        type: 'GET',
        url: 'https://api.github.com/repos/ryou/ryou.github.io/contents/posts',
        dataType: 'jsonp',
        jsonpCallback: 'hoge'
      })
      .then(
        function(json) {
          if (json.meta.status !== 200) {
            alert('記事リストの取得に失敗しました。')
            return;
          }
          json.data.forEach(function(e, i, a) {
            var tmp = e.name.split('__');
            var obj = {
              url: '/posts/' + e.name + '/',
              date: tmp[0],
              title: tmp[1]
            };
            self.articles.push(obj);
          });
        },
        function() {
          console.log('error');
        }
      );
    }
  });
})();
