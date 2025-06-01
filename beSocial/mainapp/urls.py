from django.urls import path
from .views import RegisterView, LoginView,TestAPIView,UserDetailView,UserListView,DashboardView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
     path('test/', TestAPIView.as_view(), name='test-api'),
     path('users/', UserListView.as_view(),name='users'),
     path("user/", UserDetailView.as_view(), name="user-detail"),
     path('dashboard/', DashboardView.as_view(), name='dashboard'), 
]
