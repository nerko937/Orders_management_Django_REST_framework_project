from rest_framework import serializers
from .models import Order, Progress


class OrderSerializer(serializers.ModelSerializer):
	status = serializers.ReadOnlyField(
		read_only=True,
		source='progress.finish_status'
	)

	class Meta:
		model = Order
		fields = ('name', 'order_type', 'status', 'realisation_limit_date')


class ProgressSerializer(serializers.ModelSerializer):

	class Meta:
		model = Progress
		fields = '__all__'