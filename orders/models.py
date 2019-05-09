from django.contrib.auth.models import User
from django.db import models


class Order(models.Model):

	name = models.CharField(max_length=255)
	creation_date = models.DateField(
		auto_now_add=True
	)
	realisation_limit_date = models.DateField()
	added_by = models.ForeignKey(
		User,
		on_delete=models.SET_NULL,
		null=True
	)


class Progress(models.Model):

	order = models.ForeignKey(
		Order,
		on_delete=models.CASCADE
	)
	pieces_made = models.BooleanField(default=False)
	heat_treatment = models.NullBooleanField()
	assembly = models.NullBooleanField()
	finish_status = models.BooleanField(default=False)
