from django.contrib.auth.models import User
from django.db import models


class Progress(models.Model):

	pieces_made = models.BooleanField(verbose_name='zrobienie płytek', default=False)
	heat_treatment = models.NullBooleanField(verbose_name='hartowanie')
	assembly = models.NullBooleanField(verbose_name='montaż')
	weld = models.NullBooleanField(verbose_name='spawanie')
	finish_status = models.BooleanField(verbose_name='status ukończenia', default=False)

	def __str__(self):
		return f'{self.id} - {self.finish_status}'

	class Meta:
		verbose_name = 'Postęp'
		verbose_name_plural = 'Postępy'


ORDER_TYPE = (
	('pieces', 'surowe płytki'),
	('chain', 'łańcuch'),
	('welded construction', 'konstrukcja spawana')
)


class Order(models.Model):

	name = models.CharField(verbose_name='nazwa', max_length=255)
	progress = models.OneToOneField(
		Progress,
		verbose_name='Postęp',
		on_delete=models.CASCADE,
		primary_key=True
	)
	order_type = models.CharField(
		verbose_name='typ zamówienia',
		max_length=32,
		choices=ORDER_TYPE)
	barcode = models.PositiveSmallIntegerField(verbose_name='kod kreskowy')
	creation_date = models.DateField(
		verbose_name='data utworzenia',
		auto_now_add=True
	)
	realisation_limit_date = models.DateField(verbose_name='termin realizacji')
	added_by = models.ForeignKey(
		User,
		verbose_name='dodano przez',
		on_delete=models.SET_NULL,
		null=True
	)

	def __str__(self):
		return self.name

	class Meta:
		verbose_name = 'Zamówienie'
		verbose_name_plural = 'Zamówienia'
