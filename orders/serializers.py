from rest_framework import serializers
from .models import Order, Progress


class OrderSerializer(serializers.ModelSerializer):

	class Meta:
		model = Order
		fields = ('name', 'order_type', 'realisation_limit_date')


class ProgressSerializer(serializers.ModelSerializer):
	order = serializers.HyperlinkedModelSerializer(read_only=True)

	class Meta:
		model = Progress
		fields = '__all__'