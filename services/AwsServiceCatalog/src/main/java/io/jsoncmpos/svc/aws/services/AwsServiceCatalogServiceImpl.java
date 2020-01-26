package io.jsoncmpos.svc.aws.services;

import java.util.ArrayList;
import java.util.Collection;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.jsoncmpos.svc.aws.models.dao.AwsServiceCatalogItem;
import io.jsoncmpos.svc.aws.repositories.AwsServiceCatalogRepository;

@Service
public class AwsServiceCatalogServiceImpl implements AwsServiceCatalogService {

	private AwsServiceCatalogRepository repository;
	
	@Autowired
	public AwsServiceCatalogServiceImpl(AwsServiceCatalogRepository repository) {
		this.repository = repository;
	}
	
	@Override
	public Collection<AwsServiceCatalogItem> getAll() {
		return repository.allItems().stream()
				.sorted((a,b) -> a.getName().compareTo(b.getName()))
				.collect(Collectors.toCollection(ArrayList::new));
	}
	
	@Override 
	public Collection<String> getGroups() {
		return repository.allGroups();
	}
}
