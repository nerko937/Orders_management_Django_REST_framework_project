from rest_framework import serializers
from .models import Order, Progress


class OrderSerializer(serializers.ModelSerializer):
	pk = serializers.ReadOnlyField(
		read_only=True,
		source='progress.pk'
	)
	status = serializers.ReadOnlyField(
		read_only=True,
		source='progress.finish_status'
	)

	class Meta:
		model = Order
		fields = ('pk', 'name', 'order_type', 'status', 'realisation_limit_date')


class ProgressSerializer(serializers.ModelSerializer):

	class Meta:
		model = Progress
		fields = '__all__'
