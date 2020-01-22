package io.jsoncmpos.svc.aws.services;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.jsoncmpos.svc.aws.models.dao.AwsServiceCatalogItem;
import io.jsoncmpos.svc.aws.repositories.AwsServiceCatalogRepository;

@Service
public class AwsServiceCatalogSearchServiceImpl implements AwsServiceCatalogSearchService {

	private AwsServiceCatalogRepository repository;
	
	@Autowired
	public AwsServiceCatalogSearchServiceImpl(AwsServiceCatalogRepository repository) {
		this.repository = repository;
	}
	
	@Override
	public Collection<AwsServiceCatalogItem> findCatalogItemsByGroup(String group) {
		return repository.find(i -> i.getGroup().equalsIgnoreCase(group));
	}

	@Override
	public AwsServiceCatalogItem findCatalogItemByName(String name) {
		Collection<AwsServiceCatalogItem> matches = repository.find(i -> i.getName().equalsIgnoreCase(name));
		if (matches.isEmpty()) {
			return null;
		}
		
		// Expect only one match
		return matches.iterator().next();
	}

	@Override
	public AwsServiceCatalogItem findCatalogItemByAcronym(String acronym) {
		Collection<AwsServiceCatalogItem> matches = repository.find(i -> i.getAcronym().equalsIgnoreCase(acronym));
		if (matches.isEmpty()) {
			return null;
		}
		
		// Expect only one match
		return matches.iterator().next();
	}
	
	@Override
	public Collection<AwsServiceCatalogItem> findCatalogItems(String searchText) {
		return repository.find(i -> 
			i.getName().contains(searchText) ||
			i.getDescription().contains(searchText));
	}
}
