### Heroku 설정 이슈

- 원인: heroku에 DB enviroment 설정 중에 `error: no pg_hba.conf entry for host "xxx.xxx.xxx.xxx", user "xxxxxxxx", database "xxxxxxxx", SSL off`라는 이슈

  - 해결: `heroku config:set --app={app-name} PGSSLMODE=no-verify`
