package test_articles

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/shunyaYoshimra/day27/backend/apps"
	"github.com/shunyaYoshimra/day27/backend/database"
	"github.com/shunyaYoshimra/day27/backend/database/entity"
	"github.com/shunyaYoshimra/day27/backend/repositories"
	"github.com/stretchr/testify/assert"
)

func InitTestArticleShow(id string) *httptest.ResponseRecorder {
	r := gin.Default()
	app := new(apps.Application)
	app.CreateTest(r)

	articleRepository := repositories.ArticleRepository{Conn: database.GetDB().Table("articles")}
	articleRepository.Create(&entity.Article{
		ID:     1,
		Title:  "test title",
		UserID: 1,
	})

	w := httptest.NewRecorder()
	req, _ := http.NewRequest(http.MethodGet, "/api/test/article/"+id, nil)
	req.Header.Set("Content-Type", "application/json")
	r.ServeHTTP(w, req)
	return w
}

func TestOccupationShow(t *testing.T) {
	t.Run("it should return success", func(t *testing.T) {
		defer database.DropAllTable()
		w := InitTestArticleShow("1")
		assert.Equal(t, http.StatusOK, w.Code)
	})
	t.Run("it shoule return 404 with invalid prams url", func(t *testing.T) {
		defer database.DropAllTable()
		w := InitTestArticleShow("2")
		assert.Equal(t, http.StatusNotFound, w.Code)
	})
}
