package io.jsoncmpos.svc.aws.repositories;

import java.util.Collection;
import java.util.UUID;
import java.util.function.Predicate;

import io.jsoncmpos.svc.aws.models.dao.AwsServiceCatalogItem;

public interface AwsServiceCatalogRepository {
	public void init();
	public void close();
	
	public AwsServiceCatalogItem load(UUID id);
	public AwsServiceCatalogItem create(AwsServiceCatalogItem item);
	public AwsServiceCatalogItem update(AwsServiceCatalogItem item);
	public boolean delete(AwsServiceCatalogItem item);
	
	public Collection<AwsServiceCatalogItem> all();
	public Collection<AwsServiceCatalogItem> find(Predicate<AwsServiceCatalogItem> predicate);
}
