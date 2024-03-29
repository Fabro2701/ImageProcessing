"""
URL configuration for ImageProcessing project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from canvas import views as canvas_views
from jobs import views as jobs_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('canvas/', canvas_views.home, name='canvas_home'),
    path('jobs/', jobs_views.home, name='jobs_home'),
    path('upload_image/', canvas_views.upload_image, name='upload_image'),

]
