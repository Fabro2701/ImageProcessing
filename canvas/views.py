import json

from django.shortcuts import render
from django.http import JsonResponse
from django.http import HttpResponse


from .processing_models import pipeline_operators


# Create your views here.
def home(request):

    if request.method == 'POST':
        post = json.load(request)
        print(post['connections'])
        print(post['forms'])
        pipe = pipeline_operators.Pipeline()
        results = pipe.run(post['connections'],post['forms'])
        print(results)

        return JsonResponse(results,safe=False)

    else:
        return render(request, 'canvas/home.html', context={'results':[{'id': 'qw', 'path': 'canvas/images/input/imagen.jpg'}, {'id': 'ee', 'path': 'canvas/images/output/ee.jpg'}]

                                                            })



def upload_image(request):
    if request.method == 'POST' and request.FILES.get('image'):
        image = request.FILES['image']

        with open('canvas/static/canvas/images/input/'+ image.name, 'wb') as f:
             for chunk in image.chunks():
                 f.write(chunk)
        return JsonResponse({'message': 'Imagen recibida correctamente.'})
    else:
        return JsonResponse({'error': 'No se recibió ninguna imagen.'}, status=400)
