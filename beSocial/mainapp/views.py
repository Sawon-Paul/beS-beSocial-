from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer, LoginSerializer,UserSerializer
from .models import User
from rest_framework.permissions import IsAuthenticated


class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)  # ✅ Correct: request.data, not request.POST
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            return Response({
                'message': 'Login successful',
                'user_id': user.id,
                'username': user.username,
                'email': user.email
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




# mainapp/views.py
from rest_framework.views import APIView
from rest_framework.response import Response

class TestAPIView(APIView):
    def get(self, request):
        return Response({"message": "Hello from Django!"},status=status.HTTP_200_OK)




class UserListView(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class UserDetailView(APIView):
    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)



class DashboardView(APIView):
    permission_classes = [IsAuthenticated] # You can change this to IsAuthenticated later

    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response({
            'count': users.count(),
            'users': serializer.data
        }, status=status.HTTP_200_OK)